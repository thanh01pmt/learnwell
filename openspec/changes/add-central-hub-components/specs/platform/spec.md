# Platform Capabilities

## ADDED Requirements

### Requirement: Multi-platform Environment Selection

Hệ thống SHALL cho phép người dùng chọn không gian làm việc (Scratch, Blockly, Web IDE) khi khởi tạo dự án.

#### Scenario: User creates a new visual programming project

- **WHEN** user selects Blockly template from PlatformLauncher
- **THEN** system loads BlocklyPane with custom toolkit

### Requirement: Embedded Platform Interoperability

Hệ thống SHALL giao tiếp hai chiều với các engine (Scratch/Blockly) thay vì dùng iframe thuần túy để có thể trích xuất AST và tiêm code.

#### Scenario: Auto-grading a Scratch project

- **WHEN** user clicks submit in Scratch mode
- **THEN** system extracts the .sb3 payload and JSON AST to send to grading funnel
