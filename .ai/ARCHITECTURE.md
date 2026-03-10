# LearnWell Architecture

## Monorepo Structure (Turborepo)

```
learnwell/                    # Workspace root
├── apps/
│   └── web/                  # Vite + React frontend (current app)
│       ├── src/
│       │   ├── components/   # UI components (90+ files)
│       │   ├── contexts/     # React contexts (Role, Auth, FeatureFlag, Notification)
│       │   ├── hooks/        # Custom hooks (useFeatureAccess, useRole, etc.)
│       │   ├── i18n/         # Internationalization (vi, en)
│       │   ├── mocks/        # Mock data for prototype mode
│       │   ├── pages/        # Route pages (132 files)
│       │   ├── services/     # API service layers
│       │   ├── types/        # TypeScript types & models
│       │   └── utils/        # Utility functions
│       ├── public/           # Static assets
│       └── index.html        # Entry point
├── packages/
│   └── db/                   # Prisma schema + client (future)
├── openspec/                 # Specification-driven development
│   ├── specs/                # Committed capabilities
│   └── changes/              # Active change proposals
├── .ai/                      # AI Agent context (this directory)
├── BEST_PRACTICES.md         # Development best practices
└── FEATURES.md               # Feature inventory & roadmap
```

## Data Flow

```
User Action → React Router → Page Component → Context/Hook → Mock Data (current)
                                                            → API Service → Supabase (future)
```

## Routing Architecture

- **Role-based routing**: `Index.tsx` renders different dashboards based on `useRole()`
- **Feature-gated routes**: `FeatureRoute.tsx` wraps routes with feature flag checks
- **Layout wrapper**: `AppLayout.tsx` provides consistent sidebar + header

### Route Prefixes

| Prefix | Owner | Description |
| --- | --- | --- |
| `/` | Teacher | Default dashboard (teacher is default role) |
| `/student/*` | Student | Student-specific pages |
| `/admin/*` | Admin | System administration |
| `/code/*` | All | Code IDE, launcher, problems |
| `/hub` | All | Project Hub |
| `/authoring/*` | Designer/Assessor | Specialized authoring tools |
| `/contests/*` | All | Competitive programming |

## State Management

- **RoleContext**: 6 roles (student, teacher, admin, parent, instructional_designer, assessor)
- **AuthContext**: Supabase auth integration (mock mode available)
- **FeatureFlagContext**: Feature toggles stored in localStorage
- **NotificationContext**: Toast notifications via Sonner

## Current Mode: Prototype

All data is **mock data**. The `VITE_ENABLE_MOCK_DATA=true` flag enables mock mode. No real database or API calls are made. Services in `src/services/` are prepared for Supabase but currently return mock data from `src/mocks/`.
