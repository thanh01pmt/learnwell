# Tutorial Capabilities

## ADDED Requirements

### Requirement: Tynker-style Tutorial UI

Hệ thống SHALL cung cấp giao diện bài học từng bước với video giới thiệu, nội dung lý thuyết và không gian làm bài tập liên kết.

#### Scenario: Student starts a coding tutorial

- **WHEN** student opens a tutorial project
- **THEN** TutorialStepViewer layout shows the current step context alongside the editor Workspace

### Requirement: Tutorial Authoring Workflow

Tác giả SHALL thiết lập thứ tự các bước bài học và liên kết với Template Project ID.

#### Scenario: Teacher creates a 3-step tutorial

- **WHEN** teacher uses TutorialBuilder
- **THEN** they can attach video URLs, objectives, and text content for each step iteratively
