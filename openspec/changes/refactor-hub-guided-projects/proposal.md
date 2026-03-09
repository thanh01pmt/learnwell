# Change: Refactor Project Hub for Guided Projects

## Why
To support community development and provide more structured learning paths, the Project Hub needs to transition from a simple "Blank Project" creator to a comprehensive gallery that includes both "Blank Projects" and "Guided Projects" (Tutorials/Templates), inspired by the Tynker dashboard layout.

## What Changes
- **[BREAKING]** UI Layout: Replace the horizontal step-by-step creation flow with a sidebar-based category navigation.
- Category Sidebar: A vertical navigation to switch between different project categories (Intro, Game, App, etc.).
- Project Gallery: A responsive grid displaying a "Blank Project" card and multiple "Guided Project" cards per category.
- Inline Configuration: For Blank Projects, the coding mode selection (Blocks/Python/JS) will be integrated directly into the selection or start flow.

## Impact
- Specs: `specs/hub/spec.md`
- Code: `src/pages/hub/ProjectHub.tsx`, `src/components/hub/ProjectTemplateCard.tsx`
- i18n: `src/i18n/locales/*/hub.json`
