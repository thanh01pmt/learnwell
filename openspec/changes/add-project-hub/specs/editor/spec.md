## ADDED Requirements

### Requirement: Editor Configuration Parameters
The Editor views SHALL accept configuration parameters (via URL or context) to determine the exact environment to load.

#### Scenario: Scratch 3 Configuration
- **WHEN** the Editor route is loaded with parameters `editor=scratch3` and `extension=stem`.
- **THEN** the system initializes the custom Scratch 3 environment with the STEM extension enabled.

### Requirement: Editor Mockup Interfaces
The system SHALL provide distinct mockup interfaces based on the selected coding mode to visualize the final experience.

#### Scenario: Block Editor Mockup
- **WHEN** the Editor route is loaded with a block-based parameter (e.g., `mode=block`).
- **THEN** the system displays the BlockEditorMock featuring Toolbox, Workspace, and Stage regions.

#### Scenario: Text Editor Mockup
- **WHEN** the Editor route is loaded with a text-based parameter (e.g., `mode=python` or `mode=js`).
- **THEN** the system displays the TextEditorMock featuring File Explorer, Code Editor, and Preview regions.
