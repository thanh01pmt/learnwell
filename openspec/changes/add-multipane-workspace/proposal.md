# Change: Add Multi-pane Workspace Editor

## Why

The Central Hub architecture requires a multi-part student workspace to facilitate the learning funnel (tutorial reading, code writing, visual previewing, execution logs tracking). A unified, resizable multi-pane architecture provides the ultimate IDE ecosystem for both Block and Text-based learning, without overwhelming the user.

## What Changes

- Build `WorkspaceRenderer.tsx` with react-resizable-panels to handle layout.
- Implement 4 Core Panes:
  - **Pane 1: Tutorial Reader** (Markdown content, Video URL, navigation buttons).
  - **Pane 2: Code Editor** (Text Editor or Blockly).
  - **Pane 3: Live Preview** (Iframe or Canvas for output).
  - **Pane 4: Console & Pipeline** (Execution logs, tests).
- Integrate **AI Companion Chat** as a collapsible sidebar or overlay.
- Develop **Block-to-Text Toggle** for semantic switching.
- Support `Contexts` mode (e.g., hiding Tutorial & Hints in "Exam" mode).

## Impact

- Specs: `editor`
- Code: `src/pages/editor/*`, `src/components/editor/*`
