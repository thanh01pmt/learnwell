# LearnWell Tech Stack

## Core

| Package | Version | Purpose |
| --- | --- | --- |
| React | 18.3.x | UI framework |
| TypeScript | 5.8.x | Type safety |
| Vite | 5.4.x | Build tool & dev server |
| React Router DOM | 6.30.x | Client-side routing |

## UI / Styling

| Package | Version | Purpose |
| --- | --- | --- |
| TailwindCSS | 3.4.x | Utility-first CSS |
| shadcn/ui | latest | Component library (Radix primitives) |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.462.x | Icon library |
| Recharts | 2.15.x | Charts & data visualization |

## State & Data

| Package | Version | Purpose |
| --- | --- | --- |
| React Query | 5.83.x | Server state management (minimal usage) |
| Supabase JS | 2.95.x | Backend client (auth + database) |
| Zod | 3.25.x | Schema validation |
| React Hook Form | 7.61.x | Form management |

## i18n

| Package | Version | Purpose |
| --- | --- | --- |
| i18next | 25.8.x | Internationalization framework |
| react-i18next | 16.5.x | React bindings |
| i18next-browser-languagedetector | 8.2.x | Auto language detection |

## Build Tooling

| Package | Version | Purpose |
| --- | --- | --- |
| Turborepo | 2.x | Monorepo build orchestration |
| pnpm | 9.15.x | Package manager (workspaces) |
| ESLint | 9.32.x | Linting |
| Vitest | 3.2.x | Unit testing |

## Constraints

- Node.js >= 18
- pnpm (required for workspaces)
- No SSR — purely client-side SPA
- Mock data mode by default (`VITE_ENABLE_MOCK_DATA=true`)
- Two supported locales: Vietnamese (`vi`) and English (`en`)
