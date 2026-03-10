# Change: Add Launcher to Navigation

## Why

The `/code/launcher` route (Platform Launcher) currently lacks a discoverable entry point in the main UI. While the `/hub` is the primary entry point for project-based learning, many users prefer a platform-first approach (e.g., launching Scratch or Blockly directly). Adding the Launcher to the sidebar improves discoverability and provides an alternative, tool-centric workflow.

## What Changes

- **ADDED**: A new "Platform Launcher" (or "Sân chơi") entry in the sidebar navigation for students and teachers.
- **MODIFIED**: Localization files (`navigation.json`) to include the "launcher" key for both English and Vietnamese.
- **MODIFIED**: `AppSidebar.tsx` to include the new navigation item in the student and teacher navigation arrays.

## Impact

- **Specs**: New requirement for tool-first navigation in the `navigation` capability.
- **Code**: `src/components/layout/AppSidebar.tsx`, `src/i18n/locales/vi/navigation.json`, `src/i18n/locales/en/navigation.json`.
