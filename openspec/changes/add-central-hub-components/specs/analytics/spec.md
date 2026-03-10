# Analytics Capabilities

## ADDED Requirements

### Requirement: Data Funnel Visualization

Hệ thống SHALL hiển thị biểu đồ phễu nộp bài cho từng lớp học, biểu thị số lượng học sinh qua các giai đoạn từ Try đến Success.

#### Scenario: Teacher reviews class performance

- **WHEN** teacher opens SubmissionAnalytics
- **THEN** system renders FunnelChart showing drop-off rates at each step

### Requirement: Granular Submission History

Hệ thống SHALL cho phép giáo viên theo dòng code từ attempt đầu tiên đến khi pass để đánh giá mức độ tiếp thu.

#### Scenario: Analyzing student's recursive function

- **WHEN** teacher views a student's submission timeline
- **THEN** system shows each attempt with its CodeMetadataViewer diff
