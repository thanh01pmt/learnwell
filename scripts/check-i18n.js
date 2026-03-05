import fs from 'fs';
import path from 'path';

const localesDir = path.resolve('src/i18n/locales');
const sourceLang = 'vi';
const targetLangs = ['en'];

function getKeys(obj, prefix = '') {
    return Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            return [...res, prefix + el];
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...getKeys(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
    }, []);
}

targetLangs.forEach(lang => {
    const sourceNamespaceFiles = fs.readdirSync(path.join(localesDir, sourceLang));

    sourceNamespaceFiles.forEach(file => {
        const sourcePath = path.join(localesDir, sourceLang, file);
        const targetPath = path.join(localesDir, lang, file);

        if (!fs.existsSync(targetPath)) {
            console.error(`[FAIL] Missing namespace file: ${lang}/${file}`);
            return;
        }

        const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

        const sourceKeys = getKeys(sourceData);
        const targetKeys = getKeys(targetData);

        const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));
        const extraKeys = targetKeys.filter(key => !sourceKeys.includes(key));

        if (missingKeys.length > 0) {
            console.warn(`[WARN] ${lang}/${file} is missing keys:`, missingKeys);
        }

        if (extraKeys.length > 0) {
            console.info(`[INFO] ${lang}/${file} has extra keys (not in source):`, extraKeys);
        }

        if (missingKeys.length === 0 && extraKeys.length === 0) {
            console.log(`[OK] ${lang}/${file} is in sync.`);
        }
    });
});
