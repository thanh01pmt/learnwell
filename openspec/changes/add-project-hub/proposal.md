# Change: Add Project Hub and Editor Redirect

## Why

Users need a central place to select their desired project type and coding mode, which will then appropriately configure and launch the corresponding editor experience.

## What Changes

- Build a new Hub page (`/hub`) allowing users to select:
  - Project Type: Intro, Game Design, App, STEM&AI, Physics Simulation, Robotics Simulation, Algorithm
  - Coding Mode: Block Coding, Python, JS, etc.
- Implement Editor redirect logic that reads the selected type/mode.
- Build Mock Editor interfaces to simulate the destination:
  - `BlockEditorMock`: Simulates Scratch/Blockly (Toolbox, Workspace, Stage) for block coding.
  - `TextEditorMock`: Simulates Python/JS environments (Files, Code, Preview).
- Navigate to the correct Editor route (`/editor/block` or `/editor/text`) with query parameters.

## Impact

- Specs: `hub`
- Code: New React components for Hub page, routing updates in `src/App.tsx` or router config, new Editor redirection handler.
