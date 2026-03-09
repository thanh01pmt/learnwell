# Editor Specification

## ADDED Requirements

### Requirement: Multi-Pane Workspace Layout

The system SHALL provide a flexible, resizable multi-pane IDE layout for code learning.

#### Scenario: User navigates tutorials and writes code simultaneously

- **WHEN** the student opens a project in "Learn" mode
- **THEN** the workspace displays the Tutorial Reader (Pane 1) alongside the Code Editor (Pane 2).

### Requirement: Evaluation & Preview Integration

The system SHALL display the visual output and execution logs concurrently with code writing.

#### Scenario: Running the project

- **WHEN** the student clicks "Run"
- **THEN** the Preview Canvas updates its visual state and the Console Panel prints the execution payload from the backend.

### Requirement: Context-Aware Workspace Configuration

The workspace UI SHALL hide elements like Tutorials and Hints if the system context is strictly operational (e.g., Assessment/Exam).

#### Scenario: Taking an exam

- **WHEN** the session context is configured for "Thi" (Exam)
- **THEN** the system disables the Tutorial Pane, lock features, and enforces the `grading_config` securely.
