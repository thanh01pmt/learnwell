#!/usr/bin/env node
/**
 * Hardcoded Vietnamese String Detector
 * 
 * Scans .tsx and .ts files for strings containing Vietnamese characters
 * which should probably be localized.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Regex for Vietnamese characters (lowercase and uppercase)
const VN_CHARS_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

// Exclude directories
const EXCLUDE_DIRS = [
    'node_modules',
    '.git',
    'dist',
    'build',
    'scripts',
    'public',
    'src/i18n/locales', // Don't check locale files themselves
];

const results = [];

function scanDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = path.relative(ROOT_DIR, fullPath);

        if (EXCLUDE_DIRS.some(d => relPath.startsWith(d))) continue;

        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            scanDir(fullPath);
        } else if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                // Simple check for strings in JS/TSX
                // Matches "...", '...', or >...< in TSX
                if (VN_CHARS_REGEX.test(line)) {
                    // Check if it's a comment
                    const trimmed = line.trim();
                    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

                    results.push({
                        file: relPath,
                        line: index + 1,
                        content: trimmed
                    });
                }
            });
        }
    }
}

console.log('🔍 Scanning for hardcoded Vietnamese strings...');
scanDir(path.join(ROOT_DIR, 'src'));

console.log(`\nFound ${results.length} potential hardcoded strings:\n`);

// Group by file
const byFile = {};
results.forEach(res => {
    if (!byFile[res.file]) byFile[res.file] = [];
    byFile[res.file].push(res);
});

Object.keys(byFile).forEach(file => {
    console.log(`\nFile: ${file}`);
    byFile[file].forEach(res => {
        console.log(`  Line ${res.line}: ${res.content}`);
    });
});

// Save to JSON for further processing
fs.writeFileSync(
    path.join(ROOT_DIR, 'hardcoded-vn-report.json'),
    JSON.stringify(byFile, null, 2)
);
