# Capability: Contest Management

## ADDED Requirements

### Requirement: Contest Management

The system SHALL provide administrative tools to manage coding contests, including creation, editing, and monitoring.

#### Scenario: View Contest List

- **WHEN** an admin visits the contest management dashboard
- **THEN** a list of all existing contests with their current status and metrics is displayed

#### Scenario: Create a Contest

- **WHEN** an admin clicks to create a new contest
- **THEN** a draft contest is created and the admin is redirected to the editor

#### Scenario: Edit Contest Configuration

- **WHEN** an admin modifies contest settings
- **THEN** the changes are saved to the contest's configuration

#### Scenario: Manage Challenges

- **WHEN** an admin navigates to the challenge builder of a contest
- **THEN** the admin can add, remove, and configure the challenges within the contest

#### Scenario: Live Monitoring

- **WHEN** an admin navigates to the live monitor page of an active contest
- **THEN** real-time statistics and activity feed of the contest are displayed

#### Scenario: Manage Accounts

- **WHEN** an admin navigates to the accounts page
- **THEN** the admin can bulk import or individually manage accounts assigned to the contest
