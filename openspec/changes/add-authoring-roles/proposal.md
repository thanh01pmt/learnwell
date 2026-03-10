# Change: Add Authoring Roles

## Why

The newly added Tutorial Builder and Grading Config Builder are highly technical and specialized authoring tools. Exposing them to all standard "teachers" introduces the risk of system-wide misconfiguration (e.g., setting global grading test cases incorrectly) and clutters the interface for educators who only need to monitor class progress. Separating these into "Instructional Designer" and "Assessor" roles ensures security, usability, and appropriate segregation of duties.

## What Changes

- **MODIFIED**: Expand the globally recognized role types to include `instructional_designer` and `assessor`.
- **MODIFIED**: Update the RoleContext and authentication context to accept and handle these new roles.
- **ADDED**: Add role-based routing guards for the Authoring routes to restrict `/authoring/tutorials` to Instructional Designers and `/authoring/grading` to Assessors (and Admins).
- **MODIFIED**: Update the RoleSwitcher UI and relevant translation files to display the two new roles cleanly for testing/demo purposes.
- **ADDED**: Establish default dashboard landing pages or entry views for these specific roles.

## Impact

- **Specs**: Adds role differentiation rules to the `auth` and `authoring` capabilities (if they exist, creating if they don't).
- **Code**: `src/contexts/RoleContext.tsx`, `src/components/layout/RoleSwitcher.tsx`, routing files (e.g., `App.tsx` or role guards), layout organization.
- **Locales**: `common.json`, `navigation.json` for mapping role names.
