# Change: Add Central Hub Components

## Why

Tài liệu BA Central Hub yêu cầu tích hợp các công cụ đa nền tảng (Scratch, Blockly, Web IDE), hệ thống chấm điểm nâng cao & AI feedback, theo dõi phễu dữ liệu (funnel), và bài học dạng Tynker. Hiện tại hệ thống đang thiếu các UI component và page để hỗ trợ các luồng này.

## What Changes

- **ADDED** `platform`: Hỗ trợ Embed Scratch và Blockly thay vì dùng Iframe thuần túy để có thể giao tiếp dữ liệu AST/code.
- **ADDED** `grading`: Cấu hình tự động chấm điểm theo format `grading_config` và hiển thị AI Feedback.
- **ADDED** `analytics`: Báo cáo biểu đồ phễu Submissions và lịch sử nộp bài.
- **ADDED** `tutorials`: Authoring tool và Viewer cho định dạng bài học từng bước kiểu Tynker.
- **ADDED** `assessments`: Các Guard layer trên UI để quản lý chế độ (Thi, Ôn tập, Luyện tập).

## Impact

- Specs: `platform`, `grading`, `analytics`, `tutorials`, `assessments`
- Code: Thêm mới khoảng 4 Pages và 11 Components trong các thư mục `src/components/` và `src/pages/`.
