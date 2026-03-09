# Specification: Project Hub

## ADDED Requirements

### Requirement: User Selects Project Type

The system SHALL present a list of project types for the user to select from.

#### Scenario: User views Hub page

- **WHEN** the user navigates to the Project Hub (`/hub` or similar).
- **THEN** they are presented with options: `[Intro, Game Design, App, STEM&AI, Physics Simulation, Robotics Simulation, Algorithm]`.

### Requirement: User Selects Coding Mode

The system SHALL present available coding interaction modes after or alongside the project type selection.

#### Scenario: User selects a mode

- **WHEN** the user selects a project type.
- **THEN** they can select a coding mode: `[Block Coding, Python, JS]`.

### Requirement: Redirect to Editor

The system SHALL route the user to the appropriate Editor platform based on the combined selections.

#### Scenario: Launching Scratch 3 Editor

- **WHEN** the user selects a project type that maps to Scratch 3 and clicks "Start".
- **THEN** the system redirects to the Scratch 3 environment with the corresponding extension enabled.

#### Scenario: Launching Blockly Editor

- **WHEN** the user selects a project type that maps to Blockly and selects either Block or Text coding.
- **THEN** the system redirects to the Blockly environment with the required extension and coding mode (block or text) configured.
