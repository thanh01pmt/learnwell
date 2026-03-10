# LearnWell Glossary

## Roles

| Term | Vietnamese | Description |
| --- | --- | --- |
| `student` | Học sinh | Learner with access to courses, coding, contests |
| `teacher` | Giáo viên | Educator with class management, grading, authoring |
| `admin` | Quản trị viên | System administrator with full access |
| `parent` | Phụ huynh | Parent/guardian with view-only access to child's data |
| `instructional_designer` | Người soạn giảng | Specialist for Tutorial Builder |
| `assessor` | Kỹ sư chuyên môn | Specialist for Grading Config |

## Features / Modules

| Term | Route | Description |
| --- | --- | --- |
| **Platform Launcher** | `/code/launcher` | Quick-access coding environment selector (Scratch, Blockly, Web IDE) |
| **Project Hub** | `/hub` | Project-first creation flow with templates |
| **Code IDE** | `/code/ide` | Monaco-based web code editor |
| **Problem Library** | `/problems` | Competitive programming problem catalog |
| **Contest Arena** | `/contests` | Live competitive programming contests |
| **Tutorial Builder** | `/authoring/tutorials` | Authoring tool for instructional designers |
| **Grading Config** | `/authoring/grading` | Test case & rubric configuration for assessors |
| **Feature Flag** | N/A | Runtime toggle for enabling/disabling features |

## Technical Terms

| Term | Description |
| --- | --- |
| **OpenSpec** | Specification-driven development system in `openspec/` directory |
| **FeatureRoute** | Route wrapper that checks feature flags before rendering |
| **AppLayout** | Layout component providing sidebar + header chrome |
| **RoleSwitcher** | UI component for switching between roles (dev/demo mode) |
| **LearnCoin** | Virtual currency earned through learning activities |
| **Gems** | Premium currency for special items |
| **XP** | Experience points contributing to level progression |
| **ELO** | Competitive rating system for contests |
| **Mock Mode** | `VITE_ENABLE_MOCK_DATA=true` — no backend needed |

## File References

| File | Purpose |
| --- | --- |
| `src/contexts/RoleContext.tsx` | Role management & impersonation |
| `src/contexts/FeatureFlagContext.ts` | Feature flag context & hook |
| `src/contexts/FeatureFlagProvider.tsx` | Feature flag provider with localStorage |
| `src/utils/featureRegistry.ts` | Route ↔ feature flag mapping |
| `src/components/auth/FeatureRoute.tsx` | Protected route component |
| `src/types/database.ts` | Supabase-compatible type definitions |
| `src/types/models/` | Domain model interfaces (14 files) |
