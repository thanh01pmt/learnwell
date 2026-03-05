import fs from 'fs';
import path from 'path';

const VI_ADDITIONS = {
    "mock": {
        "startTimeOngoing": "Bắt đầu: 08:00, hôm nay",
        "endTimeFinishIn": "Kết thúc sau: {{time}}",
        "endTimeStartsIn": "Bắt đầu sau: {{time}} ngày",
        "endTimeStartsIn7d": "Bắt đầu sau: 7 ngày",
        "duration3h": "3 giờ",
        "duration2h": "2 giờ",
        "duration24h": "24 giờ",
        "duration1_5h": "1.5 giờ",
        "difficultyMediumHard": "Trung bình - Khó",
        "difficultyEasy": "Cơ bản",
        "difficultyVeryHard": "Rất khó",
        "prize1": "Chứng chỉ + 500 LearnCoins",
        "prize2": "Huy hiệu + 200 LearnCoins",
        "prize3": "500.000 VNĐ + Cúp",
        "prize4": "LearnCoins"
    }
};

const EN_ADDITIONS = {
    "mock": {
        "startTimeOngoing": "Starts: 08:00, today",
        "endTimeFinishIn": "Finishes in: {{time}}",
        "endTimeStartsIn": "Starts in: {{time}} days",
        "endTimeStartsIn7d": "Starts in 7 days",
        "duration3h": "3 hours",
        "duration2h": "2 hours",
        "duration24h": "24 hours",
        "duration1_5h": "1.5 hours",
        "difficultyMediumHard": "Medium - Hard",
        "difficultyEasy": "Easy",
        "difficultyVeryHard": "Very Hard",
        "prize1": "Certificate + 500 LearnCoins",
        "prize2": "Badge + 200 LearnCoins",
        "prize3": "500,000 VND + Trophy",
        "prize4": "LearnCoins"
    }
};

function fillTranslations(obj, translations) {
    for (const key in translations) {
        if (typeof translations[key] === 'object' && !Array.isArray(translations[key])) {
            if (!obj[key]) obj[key] = {};
            fillTranslations(obj[key], translations[key]);
        } else {
            obj[key] = translations[key];
        }
    }
}

const localesDir = './src/i18n/locales';

// Update VI
const viPath = path.join(localesDir, 'vi/contests.json');
if (fs.existsSync(viPath)) {
    const content = JSON.parse(fs.readFileSync(viPath, 'utf-8'));
    fillTranslations(content, VI_ADDITIONS);
    fs.writeFileSync(viPath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
    console.log(`Updated ${viPath}`);
}

// Update EN
const enPath = path.join(localesDir, 'en/contests.json');
if (fs.existsSync(enPath)) {
    const content = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
    fillTranslations(content, EN_ADDITIONS);
    fs.writeFileSync(enPath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
    console.log(`Updated ${enPath}`);
}
