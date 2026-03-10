# Assessment Capabilities

## ADDED Requirements

### Requirement: Mode-based UI Guardrails

Hệ thống UI SHALL thay đổi bộ khả năng tùy thuộc vào chế độ hiện tại của Session (Lesson, Review, Practice, Exam).

#### Scenario: Student enters Exam Mode

- **WHEN** SessionMode is Exam
- **THEN** SessionModeGuard disables the console, hides test case details, and prevents copy-pasting code snippets
