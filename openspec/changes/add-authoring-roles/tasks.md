## 1. Type and Context Updates
- [ ] 1.1 Update `UserRole` type in `src/contexts/RoleContext.tsx` to include `"instructional_designer"` and `"assessor"`.
- [ ] 1.2 Update the dummy auth flow default fallbacks or role-checking constraints if necessary.

## 2. Locales Updates
- [ ] 2.1 Add translation keys for `instructional_designer` and `assessor` in `src/i18n/locales/vi/common.json` and `navigation.json`.
- [ ] 2.2 Add translation keys for `instructional_designer` and `assessor` in `src/i18n/locales/en/common.json` and `navigation.json`.

## 3. Component Updates
- [ ] 3.1 Update `src/components/layout/RoleSwitcher.tsx` to include the `instructional_designer` (Icon: PenTool, Color: bg-indigo-500) and `assessor` (Icon: Stethoscope / Scale, Color: bg-orange-500) roles in the `roles` array.
- [ ] 3.2 Map the new roles to appropriate default paths in `getDashboardPath()` within `RoleSwitcher.tsx` (e.g., `/authoring/tutorial-builder` for designer, `/authoring/grading-config` for assessor).

## 4. Routing & Guards
- [ ] 4.1 Implement role-based route wrapping or redirection logic for the `/authoring/` routes in the main layout/router files (ensure only allowed roles plus Admin can access).
- [ ] 4.2 Verify layout visibility so that Sidebar items filter according to these new roles accurately.
