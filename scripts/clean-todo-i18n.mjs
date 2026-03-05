import fs from 'fs';
import path from 'path';

// Common Vietnamese translations for frequent keys
const COMMON_VI = {
    "title": "Tiêu đề",
    "subtitle": "Phụ đề",
    "description": "Mô tả",
    "desc": "Mô tả",
    "actions": "Hành động",
    "searchPlaceholder": "Tìm kiếm...",
    "filter": "Lọc",
    "status": "Trạng thái",
    "save": "Lưu",
    "cancel": "Hủy",
    "submit": "Gửi",
    "delete": "Xóa",
    "edit": "Sửa",
    "view": "Xem",
    "all": "Tất cả",
    "next": "Tiếp theo",
    "prev": "Trước đó",
    "upcoming": "Sắp tới",
    "past": "Đã kết thúc",
    "ongoing": "Đang diễn ra",
    "live": "Trực tiếp",
    "ended": "Đã kết thúc",
    "loading": "Đang tải...",
    "error": "Lỗi",
    "success": "Thành công",
    "name": "Họ tên",
    "email": "Email",
    "date": "Ngày",
    "time": "Thời gian",
    "back": "Quay lại",
    "details": "Chi tiết",
    "placeholder": "Nhập thông tin...",
    "configure": "Cấu hình",
    "settings": "Cài đặt",
    "reports": "Báo cáo",
    "active": "Hoạt động",
    "completed": "Hoàn thành",
    "pending": "Đang chờ",
    "overdue": "Quá hạn",
    "achievements": "Thành tích",
    "curriculum": "Chương trình học",
    "attendance": "Điểm danh",
    "grades": "Điểm số",
    "students": "Học sinh",
    "teachers": "Giáo viên",
    "classes": "Lớp học",
    "dashboard": "Bảng điều khiển",
    "forum": "Diễn đàn",
    "playground": "Sân chơi",
    "projects": "Dự án",
    "profile": "Hồ sơ",
    "notifications": "Thông báo",
    "announcements": "Thông báo",
    "results": "Kết quả",
    "searching": "Đang tìm kiếm...",
    "filtering": "Đang lọc...",
    "showing": "Đang hiển thị",
    "schedule": "Lịch trình",
    "summary": "Tóm tắt",
    "badge": "Huy hiệu",
    "markComplete": "Đánh dấu hoàn thành",
    "downloadPdf": "Tải PDF",
    "share": "Chia sẻ",
    "steps": "Các bước",
    "materials": "Tài liệu",
    "viewDetails": "Xem chi tiết",
    "parentTips": "Lời khuyên cho phụ huynh",
    "estimatedTime": "Thời gian dự kiến",
    "rating": "Đánh giá",
    "topThisWeek": "Nổi bật tuần này",
    "viewList": "Xem danh sách",
    "goToForum": "Đi đến diễn đàn",
    "child1": "Con thứ nhất",
    "child2": "Con thứ hai",
    "parentName": "Tên phụ huynh",
    "viewAll": "Xem tất cả",
    "highest": "Cao nhất",
    "lowest": "Thấp nhất",
    "average": "Trung bình",
    "passRate": "Tỉ lệ đạt",
    "gradeDistribution": "Phân bổ điểm số",
    "performanceTrend": "Xu hướng học tập",
    "subjectComparison": "So sánh môn học",
    "verifiedMember": "Thành viên xác minh",
    "fail": "Thất bại",
    "record": "Kỷ lục",
    "streak": "Chuỗi thắng",
    "hint": "Gợi ý",
    "aiSuggestion": "Gợi ý AI",
    "clanName": "Tên Bang hội",
    "phase1": "Giai đoạn 1",
    "phase2": "Giai đoạn 2",
    "problemTitle": "Tiêu đề bài tập",
    "teamName": "Tên đội",
    "reportError": "Báo lỗi",
    "m1": "Tin nhắn 1",
    "m2": "Tin nhắn 2",
    "chat": "Trò chuyện",
    "audioLessons": "Bài học âm thanh",
    "behaviorIndex": "Chỉ số hành vi",
    "coreSkills": "Kỹ năng cốt lõi",
    "teacherRemarks": "Nhận xét của giáo viên",
    "mockRemarks": "Nhận xét mẫu",
    "mockTeacherName": "Tên giáo viên mẫu",
    "progressComparison": "So sánh tiến độ",
    "collaboration": "Cộng tác",
    "problemSolving": "Giải quyết vấn đề",
    "bestSubject": "Môn học tốt nhất",
    "needsImprovement": "Cần cải thiện",
    "bookMeeting": "Đặt lịch họp",
    "message": "Nhắn tin",
    "meetingContent": "Nội dung cuộc họp",
    "selectTeacher": "Chọn giáo viên",
    "selectTime": "Chọn thời gian",
    "noTeachersFound": "Không tìm thấy giáo viên",
    "logs": "Nhật ký",
    "subject": "Môn học",
    "history": "Lịch sử"
};

function humanize(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, s => s.toUpperCase())
        .trim();
}

const TODO_REGEX = /^\[TODO_(EN|VI)\]\s*/i;

function translateValue(val, path, lang) {
    if (typeof val !== 'string') return val;
    if (!TODO_REGEX.test(val)) return val;

    const parts = path.split('.');
    const lastPart = parts[parts.length - 1];

    if (lang === 'vi') {
        // Try to find in our common map first
        if (COMMON_VI[lastPart]) return COMMON_VI[lastPart];

        // Check if it's a known key
        for (const [k, v] of Object.entries(COMMON_VI)) {
            if (lastPart.toLowerCase() === k.toLowerCase()) return v;
        }

        // Try fuzzy match
        for (const [k, v] of Object.entries(COMMON_VI)) {
            if (lastPart.toLowerCase().includes(k.toLowerCase())) return v;
        }

        // Fallback: strip TODO and humanize
        return humanize(lastPart);
    } else {
        // For English: strip TODO and humanize
        return humanize(lastPart);
    }
}

function processObject(obj, lang, currentPath = '') {
    for (const key in obj) {
        const val = obj[key];
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof val === 'string') {
            obj[key] = translateValue(val, newPath, lang);
        } else if (typeof val === 'object' && val !== null) {
            processObject(val, lang, newPath);
        }
    }
}

const localesDir = './src/i18n/locales';
const languages = ['vi', 'en'];

languages.forEach(lang => {
    const langDir = path.join(localesDir, lang);
    if (!fs.existsSync(langDir)) return;

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
        const filePath = path.join(langDir, file);
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            processObject(content, lang);
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
            console.log(`Cleaned TODOs in ${filePath}`);
        } catch (e) {
            console.error(`Error processing ${filePath}: ${e.message}`);
        }
    });
});
