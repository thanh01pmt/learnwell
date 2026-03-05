#!/usr/bin/env node
/**
 * i18n Key Validator Script
 * 
 * This script detects i18n issues:
 * 1. Keys used in source code but missing from translation files
 * 2. Keys that exist in one language but not another
 * 3. Keys in translation files that are never used (optional)
 * 
 * Usage: node scripts/check-i18n.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
    srcDir: path.join(ROOT_DIR, 'src'),
    localesDir: path.join(ROOT_DIR, 'src/i18n/locales'),
    languages: ['vi', 'en'],
    primaryLanguage: 'vi',
    extensions: ['.tsx', '.ts'],
    excludeDirs: ['node_modules', '.git', 'dist', 'build'],
};

// ANSI colors for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    dim: '\x1b[2m',
    bold: '\x1b[1m',
};

// ============================================================================
// Utility Functions
// ============================================================================

function getAllFiles(dir, extensions, excludeDirs) {
    const files = [];

    function walk(currentDir) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                if (!excludeDirs.includes(item)) {
                    walk(fullPath);
                }
            } else if (extensions.includes(path.extname(item))) {
                files.push(fullPath);
            }
        }
    }

    walk(dir);
    return files;
}

function flattenObject(obj, prefix = '') {
    const result = {};

    for (const key of Object.keys(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(result, flattenObject(obj[key], newKey));
        } else {
            result[newKey] = obj[key];
        }
    }

    return result;
}

// ============================================================================
// Extract Keys from Source Code
// ============================================================================

function extractKeysFromCode(content, filePath) {
    const keys = new Set();

    // Patterns to match:
    // t("key") or t('key')
    // t("namespace:key") or t('namespace:key')
    // t("key", { ... })
    // t`key` (template literals - less common)
    // useTranslation("namespace") + t("key") => namespace:key

    // Find useTranslation declarations to get namespaces
    const namespaceMatches = content.matchAll(/useTranslation\s*\(\s*[\['"]([\w,\s\-'"]+)['"}\]]\s*\)/g);
    const declaredNamespaces = [];

    for (const match of namespaceMatches) {
        const nsString = match[1];
        // Handle array syntax: ["ns1", "ns2"] or single: "ns1"
        const nsList = nsString.split(/[,\s]+/).map(n => n.replace(/['"]/g, '').trim()).filter(Boolean);
        declaredNamespaces.push(...nsList);
    }

    // Default namespace if none declared
    const defaultNs = declaredNamespaces[0] || 'common';

    // Match t("key") patterns
    const tFunctionPatterns = [
        /\bt\s*\(\s*["']([^"']+)["']/g,                          // t("key") or t('key')
        /\bt\s*\(\s*["']([^"']+)["']\s*,/g,                      // t("key", {...})
        /\bi18n\.t\s*\(\s*["']([^"']+)["']/g,                    // i18n.t("key")
    ];

    for (const pattern of tFunctionPatterns) {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
            let key = match[1];

            // If key contains namespace:key format, use as-is
            if (key.includes(':')) {
                keys.add(key);
            } else {
                // Prefix with default namespace
                keys.add(`${defaultNs}:${key}`);
            }
        }
    }

    // Match Trans component keys
    const transPatterns = [
        /i18nKey\s*=\s*["']([^"']+)["']/g,
    ];

    for (const pattern of transPatterns) {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
            let key = match[1];
            if (key.includes(':')) {
                keys.add(key);
            } else {
                keys.add(`${defaultNs}:${key}`);
            }
        }
    }

    return { keys: Array.from(keys), namespaces: declaredNamespaces, defaultNs };
}

// ============================================================================
// Load Translation Files
// ============================================================================

function loadTranslations(language) {
    const localeDir = path.join(CONFIG.localesDir, language);
    const translations = {};

    if (!fs.existsSync(localeDir)) {
        console.error(`${colors.red}Locale directory not found: ${localeDir}${colors.reset}`);
        return translations;
    }

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const namespace = path.basename(file, '.json');
        const filePath = path.join(localeDir, file);

        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const flatKeys = flattenObject(content);

            for (const key of Object.keys(flatKeys)) {
                translations[`${namespace}:${key}`] = flatKeys[key];
            }
        } catch (err) {
            console.error(`${colors.red}Error parsing ${filePath}: ${err.message}${colors.reset}`);
        }
    }

    return translations;
}

// ============================================================================
// Main Analysis
// ============================================================================

function analyzeI18n() {
    console.log(`${colors.bold}${colors.cyan}🌐 i18n Key Validator${colors.reset}\n`);
    console.log(`${colors.dim}Scanning: ${CONFIG.srcDir}${colors.reset}`);
    console.log(`${colors.dim}Languages: ${CONFIG.languages.join(', ')}${colors.reset}\n`);

    // 1. Extract all keys used in source code
    const sourceFiles = getAllFiles(CONFIG.srcDir, CONFIG.extensions, CONFIG.excludeDirs);
    const usedKeysMap = new Map(); // key -> [files that use it]

    for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const { keys } = extractKeysFromCode(content, file);

        for (const key of keys) {
            if (!usedKeysMap.has(key)) {
                usedKeysMap.set(key, []);
            }
            usedKeysMap.get(key).push(path.relative(CONFIG.srcDir, file));
        }
    }

    const usedKeys = Array.from(usedKeysMap.keys()).sort();
    console.log(`${colors.green}✓${colors.reset} Found ${colors.bold}${usedKeys.length}${colors.reset} unique keys in source code\n`);

    // 2. Load translations for all languages
    const translationsByLang = {};
    for (const lang of CONFIG.languages) {
        translationsByLang[lang] = loadTranslations(lang);
        const count = Object.keys(translationsByLang[lang]).length;
        console.log(`${colors.green}✓${colors.reset} Loaded ${colors.bold}${count}${colors.reset} keys for ${lang}`);
    }
    console.log('');

    // 3. Find missing keys (used in code but not in translations)
    const missingByLang = {};
    for (const lang of CONFIG.languages) {
        missingByLang[lang] = [];

        for (const key of usedKeys) {
            if (!(key in translationsByLang[lang])) {
                missingByLang[lang].push({
                    key,
                    usedIn: usedKeysMap.get(key),
                });
            }
        }
    }

    // 4. Find keys that exist in one language but not another
    const inconsistentKeys = [];
    const allTranslationKeys = new Set();

    for (const lang of CONFIG.languages) {
        for (const key of Object.keys(translationsByLang[lang])) {
            allTranslationKeys.add(key);
        }
    }

    for (const key of allTranslationKeys) {
        const presentIn = CONFIG.languages.filter(lang => key in translationsByLang[lang]);
        const missingIn = CONFIG.languages.filter(lang => !(key in translationsByLang[lang]));

        if (missingIn.length > 0 && presentIn.length > 0) {
            inconsistentKeys.push({ key, presentIn, missingIn });
        }
    }

    // 5. Find unused keys (in translations but not in code)
    const unusedKeys = [];
    for (const key of allTranslationKeys) {
        if (!usedKeysMap.has(key)) {
            unusedKeys.push(key);
        }
    }

    // ============================================================================
    // Generate Report
    // ============================================================================

    const report = {
        summary: {
            totalUsedKeys: usedKeys.length,
            totalTranslationKeys: allTranslationKeys.size,
        },
        missingKeys: missingByLang,
        inconsistentKeys,
        unusedKeys: unusedKeys.slice(0, 50), // Limit for report
        totalUnusedKeys: unusedKeys.length,
    };

    // Print Report
    console.log(`${colors.bold}${colors.yellow}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}                          REPORT${colors.reset}`);
    console.log(`${colors.bold}${colors.yellow}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

    // Missing keys
    let totalMissing = 0;
    for (const lang of CONFIG.languages) {
        const missing = missingByLang[lang];
        totalMissing += missing.length;

        if (missing.length > 0) {
            console.log(`${colors.red}${colors.bold}❌ Missing in ${lang.toUpperCase()}: ${missing.length} keys${colors.reset}`);
            console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}`);

            // Group by namespace
            const byNamespace = {};
            for (const item of missing) {
                const [ns] = item.key.split(':');
                if (!byNamespace[ns]) byNamespace[ns] = [];
                byNamespace[ns].push(item);
            }

            for (const ns of Object.keys(byNamespace).sort()) {
                console.log(`\n  ${colors.cyan}[${ns}]${colors.reset}`);
                for (const item of byNamespace[ns].slice(0, 10)) {
                    const shortKey = item.key.substring(ns.length + 1);
                    const files = item.usedIn.slice(0, 2).join(', ');
                    console.log(`    ${colors.yellow}•${colors.reset} ${shortKey}`);
                    console.log(`      ${colors.dim}Used in: ${files}${colors.reset}`);
                }
                if (byNamespace[ns].length > 10) {
                    console.log(`    ${colors.dim}... and ${byNamespace[ns].length - 10} more${colors.reset}`);
                }
            }
            console.log('');
        }
    }

    // Inconsistent keys
    if (inconsistentKeys.length > 0) {
        console.log(`${colors.yellow}${colors.bold}⚠️  Inconsistent translations: ${inconsistentKeys.length} keys${colors.reset}`);
        console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}`);

        for (const item of inconsistentKeys.slice(0, 20)) {
            console.log(`  ${colors.yellow}•${colors.reset} ${item.key}`);
            console.log(`    ${colors.green}Present in: ${item.presentIn.join(', ')}${colors.reset}`);
            console.log(`    ${colors.red}Missing in: ${item.missingIn.join(', ')}${colors.reset}`);
        }
        if (inconsistentKeys.length > 20) {
            console.log(`  ${colors.dim}... and ${inconsistentKeys.length - 20} more${colors.reset}`);
        }
        console.log('');
    }

    // Summary
    console.log(`${colors.bold}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}                         SUMMARY${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

    console.log(`  Keys used in code:      ${colors.bold}${usedKeys.length}${colors.reset}`);
    console.log(`  Keys in translations:   ${colors.bold}${allTranslationKeys.size}${colors.reset}`);
    console.log(`  ${colors.red}Missing translations:   ${colors.bold}${totalMissing}${colors.reset}`);
    console.log(`  ${colors.yellow}Inconsistent keys:      ${colors.bold}${inconsistentKeys.length}${colors.reset}`);
    console.log(`  ${colors.dim}Unused translations:    ${unusedKeys.length}${colors.reset}`);
    console.log('');

    // Save detailed report to JSON
    const reportPath = path.join(ROOT_DIR, 'i18n-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`${colors.green}✓${colors.reset} Detailed report saved to: ${colors.cyan}${reportPath}${colors.reset}\n`);

    // Exit with error code if there are issues
    if (totalMissing > 0 || inconsistentKeys.length > 0) {
        console.log(`${colors.red}${colors.bold}⚠️  i18n validation failed!${colors.reset}`);
        process.exit(1);
    } else {
        console.log(`${colors.green}${colors.bold}✓ All i18n keys are valid!${colors.reset}`);
        process.exit(0);
    }
}

// Run
analyzeI18n();
