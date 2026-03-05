import fs from 'fs';
import path from 'path';

const VI_TRANSLATIONS = {
    "classroom": {
        "haianh": "Hải Anh",
        "minh": "Minh",
        "hoa": "Hoa",
        "nam": "Nam",
        "active": "Đang hoạt động",
        "archive": "Lưu trữ",
        "backToList": "Quay lại danh sách",
    },
    "contests": {
        "botArena": {
            "teamBattle": {
                "hint": "Gợi ý",
                "reportError": "Báo lỗi",
                "chatLobby": {
                    "m1": "Sẵn sàng chưa?",
                    "m2": "Tôi đã sẵn sàng!"
                },
                "chat": {
                    "m1": "Xin chào cả đội!",
                    "m2": "Cùng cố gắng nào!"
                },
                "mock": {
                    "teamName": "Đội chiến thắng",
                    "problemTitle": "Bài toán mẫu",
                    "opponent1": "Đối thủ 1",
                    "opponent2": "Đối thủ 2",
                    "opponent3": "Đối thủ 3",
                    "clanName": "Hội lập trình",
                    "phase1": "Giai đoạn 1",
                    "phase2": "Giai đoạn 2",
                    "aiSuggestion": "Gợi ý từ AI"
                }
            },
            "tournaments": {
                "teamBattle": {
                    "hint": "Gợi ý",
                    "reportError": "Báo lỗi",
                    "chat": {
                        "m1": "Xin chào!",
                        "m2": "Cố lên!"
                    },
                    "chatBattle": {
                        "m1": "Đang tấn công!",
                        "m2": "Phòng thủ ngay!"
                    },
                    "mock": {
                        "teamName": "Đội vô địch",
                        "problemTitle": "Thử thách thuật toán",
                        "opponent1": "Đại cao thủ",
                        "opponent2": "Ẩn sĩ",
                        "opponent3": "Chiến binh",
                        "clanName": "Biệt đội Code",
                        "phase1": "Tăng tốc",
                        "phase2": "Về đích",
                        "aiSuggestion": "Linh tính AI"
                    }
                }
            }
        }
    },
    "features": {
        "routes": {
            "student": {
                "audioLessons": "Bài học âm thanh",
                "audio": "Âm thanh"
            }
        }
    },
    "teacher": {
        "analytics": {
            "statLabels": {
                "highest": "Cao nhất",
                "average": "Trung bình",
                "lowest": "Thấp nhất",
                "passRate": "Tỉ lệ đạt"
            },
            "charts": {
                "gradeDistribution": "Phân bổ điểm số",
                "performanceTrend": "Xu hướng năng lực",
                "subjectComparison": "So sánh môn học"
            },
            "atRisk": {
                "viewAll": "Xem tất cả học sinh yếu"
            },
            "mock": {
                "studentX": "Học sinh A",
                "studentY": "Học sinh B",
                "studentZ": "Học sinh C"
            }
        },
        "seatingChart": {
            "messages": {
                "updateSuccess": "Cập nhật sơ đồ thành công"
            },
            "mock": {
                "teacherB": "Thầy Bình"
            }
        }
    },
    "profile": {
        "mock": {
            "achievements": {
                "codeMaster": {
                    "title": "Bậc thầy Code",
                    "desc": "Hoàn thành 100 bài tập"
                },
                "perfectScore": {
                    "title": "Điểm Tuyệt đối",
                    "desc": "Đạt 10/10 trong kỳ thi"
                },
                "earlyBird": {
                    "title": "Chim sớm",
                    "desc": "Thành viên gia nhập sớm"
                }
            }
        }
    }
};

const EN_TRANSLATIONS = {
    "classroom": {
        "haianh": "Hai Anh",
        "minh": "Minh",
        "hoa": "Hoa",
        "nam": "Nam"
    },
    "contests": {
        "botArena": {
            "teamBattle": {
                "hint": "Hint",
                "reportError": "Report Error",
                "chatLobby": {
                    "m1": "Ready?",
                    "m2": "I'm ready!"
                },
                "chat": {
                    "m1": "Hello team!",
                    "m2": "Let's do this!"
                },
                "mock": {
                    "teamName": "Winning Team",
                    "problemTitle": "Sample Problem",
                    "opponent1": "Opponent 1",
                    "opponent2": "Opponent 2",
                    "opponent3": "Opponent 3",
                    "clanName": "Coding Clan",
                    "phase1": "Phase 1",
                    "phase2": "Phase 2",
                    "aiSuggestion": "AI Suggestion"
                }
            }
        }
    },
    "features": {
        "routes": {
            "student": {
                "audioLessons": "Audio Lessons"
            }
        }
    },
    "teacher": {
        "analytics": {
            "statLabels": {
                "highest": "Highest",
                "average": "Average",
                "lowest": "Lowest",
                "passRate": "Pass Rate"
            },
            "charts": {
                "gradeDistribution": "Grade Distribution",
                "performanceTrend": "Performance Trend",
                "subjectComparison": "Subject Comparison"
            }
        },
        "seatingChart": {
            "messages": {
                "updateSuccess": "Seating chart updated successfully"
            },
            "mock": {
                "teacherB": "Teacher Ben"
            }
        }
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

function processDir(dir, langTranslations) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const ns = path.basename(file, '.json');
        if (langTranslations[ns]) {
            const filePath = path.join(dir, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            fillTranslations(content, langTranslations[ns]);
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
            console.log(`Updated ${filePath}`);
        }
    }
}

const localesDir = './src/i18n/locales';
processDir(path.join(localesDir, 'vi'), VI_TRANSLATIONS);
processDir(path.join(localesDir, 'en'), EN_TRANSLATIONS);
