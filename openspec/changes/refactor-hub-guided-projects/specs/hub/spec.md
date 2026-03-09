# Capability: Project Hub Gallery

The Project Hub Gallery allows users to discover and start projects.

## ADDED Requirements

### Requirement: Category Navigation
The hub SHALL provide a sidebar or tabbed navigation to filter projects by categories (e.g., Intro, Game Design).

#### Scenario: Switching Categories
- **WHEN** user clicks a category in the sidebar
- **THEN** the project gallery SHALL update to show relevant templates for that category.

### Requirement: Project Templates
The gallery SHALL display both "Blank Projects" and "Guided Projects" (Tutorials).

#### Scenario: Starting a Blank Project
- **WHEN** user selects a Blank Project card
- **THEN** they SHALL be prompted to select a coding mode (if multiple are available).
- **WHEN** user clicks "Start"
- **THEN** they SHALL be redirected to the editor with a blank slate.

#### Scenario: Starting a Guided Project
- **WHEN** user selects a Guided Project card
- **THEN** they SHALL see details about the tutorial.
- **WHEN** user clicks "Start"
- **THEN** they SHALL be redirected to the editor with pre-loaded tutorial content.
