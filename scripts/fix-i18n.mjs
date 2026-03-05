#!/usr/bin/env node
/**
 * i18n Auto-Fix Script
 * 
 * Automatically adds missing translation keys with placeholder values
 * so you can easily find and translate them.
 * 
 * Usage: node scripts/fix-i18n.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
    localesDir: path.join(ROOT_DIR, 'src/i18n/locales'),
    reportPath: path.join(ROOT_DIR, 'i18n-report.json'),
    languages: ['vi', 'en'],
};

// ANSI colors
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
};

// ============================================================================
// Utility Functions
// ============================================================================

function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (!(lastKey in current)) {
        current[lastKey] = value;
        return true;
    }
    return false;
}

function generatePlaceholder(key, lang) {
    // Generate a placeholder that clearly indicates it needs translation
    const keyParts = key.split('.');
    const lastPart = keyParts[keyParts.length - 1];

    // Convert camelCase to Title Case
    const humanized = lastPart
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();

    if (lang === 'vi') {
        return `[TODO_VI] ${humanized}`;
    } else {
        return `[TODO_EN] ${humanized}`;
    }
}

// ============================================================================
// Main Fix Logic
// ============================================================================

function fixMissingKeys() {
    console.log(`${colors.bold}${colors.cyan}🔧 i18n Auto-Fix Tool${colors.reset}\n`);

    // Load the report
    if (!fs.existsSync(CONFIG.reportPath)) {
        console.error(`${colors.red}Report not found! Run 'node scripts/check-i18n.mjs' first.${colors.reset}`);
        process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(CONFIG.reportPath, 'utf-8'));

    // Track changes per file
    const fileChanges = {};

    for (const lang of CONFIG.languages) {
        const missingKeys = report.missingKeys[lang] || [];

        if (missingKeys.length === 0) {
            console.log(`${colors.green}✓${colors.reset} No missing keys for ${lang}`);
            continue;
        }

        console.log(`${colors.yellow}Processing ${missingKeys.length} missing keys for ${lang}...${colors.reset}`);

        // Group by namespace
        const byNamespace = {};
        for (const item of missingKeys) {
            const [ns, ...keyParts] = item.key.split(':');
            const keyPath = keyParts.join(':');

            if (!byNamespace[ns]) {
                byNamespace[ns] = [];
            }
            byNamespace[ns].push(keyPath);
        }

        // Update each namespace file
        for (const ns of Object.keys(byNamespace)) {
            const filePath = path.join(CONFIG.localesDir, lang, `${ns}.json`);

            let content = {};
            if (fs.existsSync(filePath)) {
                try {
                    content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                } catch (err) {
                    console.error(`${colors.red}Error parsing ${filePath}: ${err.message}${colors.reset}`);
                    continue;
                }
            }

            let addedCount = 0;
            for (const keyPath of byNamespace[ns]) {
                const placeholder = generatePlaceholder(keyPath, lang);
                if (setNestedValue(content, keyPath, placeholder)) {
                    addedCount++;
                }
            }

            if (addedCount > 0) {
                // Write back with sorted keys
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');

                const relPath = path.relative(ROOT_DIR, filePath);
                if (!fileChanges[relPath]) {
                    fileChanges[relPath] = 0;
                }
                fileChanges[relPath] += addedCount;

                console.log(`  ${colors.green}+${addedCount}${colors.reset} keys added to ${colors.cyan}${relPath}${colors.reset}`);
            }
        }
    }

    // Summary
    console.log(`\n${colors.bold}${colors.green}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}                         SUMMARY${colors.reset}`);
    console.log(`${colors.bold}${colors.green}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

    const totalFiles = Object.keys(fileChanges).length;
    const totalKeys = Object.values(fileChanges).reduce((a, b) => a + b, 0);

    console.log(`  Files modified: ${colors.bold}${totalFiles}${colors.reset}`);
    console.log(`  Keys added:     ${colors.bold}${totalKeys}${colors.reset}`);
    console.log('');

    if (totalKeys > 0) {
        console.log(`${colors.yellow}⚠️  Remember to search for [TODO_VI] and [TODO_EN] to translate the placeholders!${colors.reset}`);
        console.log(`${colors.dim}   Use: grep -r "\\[TODO_" src/i18n/locales/${colors.reset}\n`);
    }
}

// Run
fixMissingKeys();
