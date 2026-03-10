## MODIFIED Requirements
### Requirement: Role-Based Access Control
The application SHALL support distinct user roles that dictate the accessibility of specific routes, layout components, and data manipulation capabilities. The system MUST recognize at least: Student, Teacher, Parent, Admin, Instructional Designer, and Assessor.

#### Scenario: Authoring Route Protection
- **WHEN** a user attempts to access `/authoring/tutorials`
- **THEN** the system MUST allow access ONLY IF the user holds the `instructional_designer` or `admin` role.
- **WHEN** a user attempts to access `/authoring/grading`
- **THEN** the system MUST allow access ONLY IF the user holds the `assessor` or `admin` role.
- **WHEN** an unauthorized role (e.g., `student`, `teacher`) attempts access
- **THEN** the system MUST redirect them or display an "access denied" status.

## ADDED Requirements
### Requirement: Role Switcher Emulation
For demonstration and testing, the application SHALL provide a Role Switcher component that allows quick toggling between all supported roles, updating the application state and navigating to the role's default dashboard autonomously.

#### Scenario: Switching to Specialized Roles
- **WHEN** the user selects the "Instructional Designer" role via the switcher
- **THEN** the application state context MUST update to `instructional_designer`, and the user MUST be navigated to the tutorial builder or authoring landing page.
- **WHEN** the user selects the "Assessor" role via the switcher
- **THEN** the application state context MUST update to `assessor`, and the user MUST be navigated to the grading configuration landing page.
