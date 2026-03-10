# Grading Capabilities

## ADDED Requirements

### Requirement: Full Grading Configuration

Tác giả khóa học SHALL có giao diện để tinh chỉnh `grading_config` cho từng bài học (Engine, Limits, Max Attempts, v.v.).

#### Scenario: Teacher sets memory limits

- **WHEN** teacher uses GradingConfigForm
- **THEN** system saves config matching the core JSON schema

### Requirement: Contextual AI Feedback

IDE SHALL hiển thị các nhận xét và gợi ý từ AI phụ thuộc vào ngữ cảnh lỗi sinh ra trong quá trình chấm điểm.

#### Scenario: Student fails a test case

- **WHEN** grading engine returns partial credit with AI hints
- **THEN** AIFeedbackPanel displays the hint without revealing the precise solution
