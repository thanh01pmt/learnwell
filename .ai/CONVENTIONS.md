# LearnWell Coding Conventions

## File Naming

- **Components**: PascalCase → `PlatformLauncher.tsx`, `AppSidebar.tsx`
- **Hooks**: camelCase with `use` prefix → `useFeatureAccess.ts`, `useRole.ts`
- **Contexts**: PascalCase with `Context` suffix → `RoleContext.tsx`, `AuthContext.tsx`
- **Types**: PascalCase → `UserRole`, `FeatureConfig`
- **Services**: camelCase → `hubService.ts`, `authService.ts`
- **Mocks**: camelCase → `mockStudents.ts`, `mockCourses.ts`
- **Translation files**: lowercase → `navigation.json`, `common.json`, `code.json`

## Component Patterns

### Page Components

```tsx
// src/pages/[domain]/[PageName].tsx
import { AppLayout } from "@/components/layout/AppLayout";

export default function PageName() {
  return (
    <AppLayout>
      {/* Page content */}
    </AppLayout>
  );
}
```

> **Rule**: Every page MUST be wrapped in `<AppLayout>` to ensure sidebar and header visibility.

### Translation Usage

```tsx
const { t } = useTranslation(["namespace1", "namespace2"]);
// Use: t("namespace1:key.subkey")
```

> **Rule**: Always add translation keys to BOTH `vi/` and `en/` simultaneously.

## i18n Namespaces

| Namespace | File | Purpose |
| --- | --- | --- |
| `common` | `common.json` | Shared strings (buttons, labels, roles) |
| `navigation` | `navigation.json` | Sidebar items, header, footer |
| `code` | `code.json` | Code IDE, launcher, problems |
| `landing` | `landing.json` | Public landing page |
| `admin` | `admin.json` | Admin-specific strings |

## Import Aliases

- `@/*` resolves to `apps/web/src/*`
- Always use `@/` prefix for project imports, never relative `../../../`

## State Rules

1. Use `useRole()` for role-based logic, never check role directly
2. Use `useFeatureFlag()` for feature toggles
3. Avoid prop drilling — use contexts for cross-cutting concerns
4. Keep component state local unless shared across siblings

## CSS / Styling

- TailwindCSS utility classes for all styling
- `cn()` helper from `@/lib/utils` for conditional classes
- `index.css` for CSS custom properties (HSL color tokens)
- shadcn/ui components for all UI primitives
- Framer Motion for animations

## Git Commits

Use Conventional Commits:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code restructuring
- `docs:` documentation
- `chore:` maintenance (deps, configs)
- `i18n:` translation updates
