# Change: Add contest management dashboard

## Why

We need to migrate the contest-dashboard from the react-quest-monorepo to LearnWell. This will provide administrators and teachers the capability to manage contests directly within the LearnWell platform.

## What Changes

- Add contest management pages (ContestList, ContestEditor, ChallengeBuilder, Accounts, LiveMonitor, Promotion)
- Add related components for the Dashboard Layout, JSON Import, etc.
- Integrate routes into the main App under `/admin/contests`

## Impact

- Specs: `contests`
- Code: `apps/web/src/pages/admin/contests/*`, `apps/web/src/components/contests/*`, `apps/web/src/App.tsx`
