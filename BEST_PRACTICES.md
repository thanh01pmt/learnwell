# LearnWell – Best Practices cho AI-Assisted & Multi-Member Development

> **Cập nhật**: 10 tháng 3, 2026
> **Áp dụng cho**: Dự án LearnWell (hiện tại: Prototype, sắp tới: Production)

---

## 📊 Mục lục

1. [Cấu Trúc Repo: Monorepo](#1-cấu-trúc-repo-monorepo)
2. [AI Agent Context Sharing](#2-ai-agent-context-sharing)
3. [Database Stability: Migration-first Development](#3-database-stability)
4. [Git Workflow: Trunk-Based Development](#4-git-workflow)
5. [Cơ Chế Hạn Chế Lỗi với AI Agent](#5-cơ-chế-hạn-chế-lỗi-với-ai-agent)
6. [Tóm Tắt Nhanh](#6-tóm-tắt-nhanh)

---

## 1. Cấu Trúc Repo: Monorepo

### Đề xuất: Monorepo với Turborepo

```
learnwell/
├── apps/
│   ├── web/              # Frontend React (hiện tại)
│   ├── api/              # Backend API (future)
│   └── admin-panel/      # Admin tools riêng (nếu cần)
├── packages/
│   ├── shared-types/     # TypeScript types dùng chung
│   ├── ui/               # shadcn/ui components tái sử dụng
│   ├── db/               # Prisma schema + migrations
│   ├── config/           # ESLint, TSConfig, Tailwind configs
│   └── utils/            # Shared utilities
├── openspec/             # Specs (giữ nguyên)
├── turbo.json
└── pnpm-workspace.yaml
```

**Lý do chọn Monorepo:**
- **Shared types**: Thay đổi 1 type → tất cả apps đều thấy ngay, không cần publish package.
- **Atomic commits**: Thay đổi API + Frontend có thể nằm trong 1 PR.
- **Consistent tooling**: Chung ESLint, Prettier, TSConfig.
- **Giảm conflict**: Mỗi team member làm việc trên package/feature riêng.

### Chiến lược giảm conflict

| Chiến lược | Cách áp dụng |
|---|---|
| **Feature-based folders** | Mỗi feature = 1 folder riêng (vd: `features/launcher/`, `features/grading/`) |
| **Barrel exports** | Mỗi folder có `index.ts` → chỉ import từ barrel, giảm cross-file deps |
| **Vertical slicing** | 1 feature chứa cả components, hooks, types, tests → ít overlap |
| **Trunk-based dev** | Short-lived branches (< 1 ngày), merge thường xuyên |
| **CODEOWNERS** | Mỗi folder assign cho 1 người → tránh cùng sửa 1 file |

---

## 2. AI Agent Context Sharing

### a) OpenSpec (đã có)

Single Source of Truth cho requirements. Mọi thành viên trước khi code đều phải:
1. Đọc `openspec/specs/` để hiểu capability hiện tại.
2. Kiểm tra `openspec/changes/` để biết ai đang làm gì.
3. Tạo proposal trước khi triển khai thay đổi lớn.

### b) Architecture Decision Records (ADRs)

Thêm folder `docs/adr/` chứa các quyết định kiến trúc:

```markdown
# ADR-001: Sử dụng Supabase cho Auth & Database

## Status: Accepted

## Context
Cần giải pháp auth + database cho prototype → production.

## Decision
Chọn Supabase vì: free tier đủ mạnh, RLS built-in, realtime.

## Consequences
- (+) Nhanh chóng setup
- (-) Vendor lock-in với Supabase
```

Khi AI Agent đọc ADRs, nó sẽ hiểu **tại sao** hệ thống được thiết kế như vậy.

### c) `.ai/` Context Directory

Tạo folder `.ai/` ở root chứa context cho AI Agent:

```
.ai/
├── ARCHITECTURE.md     # Tổng quan kiến trúc
├── CONVENTIONS.md      # Coding conventions, naming patterns
├── GLOSSARY.md         # Thuật ngữ dự án (UserRole, Feature Flag...)
├── STACK.md            # Tech stack & versions
└── team/
    ├── member-a.md     # Scope: Auth, User Management
    └── member-b.md     # Scope: Code IDE, Contests
```

**`CONVENTIONS.md` mẫu:**
```markdown
## File Naming
- Components: PascalCase (e.g., `PlatformLauncher.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useFeatureAccess.ts`)
- Types: PascalCase, suffix with type (e.g., `UserRole`)

## State Management
- Use RoleContext for role switching
- Use FeatureFlagContext for feature toggles
- Avoid global state beyond contexts

## i18n
- Always use translation keys, never hardcode strings
- Namespace: `navigation`, `common`, `code`, `landing`
- Add keys to BOTH vi and en simultaneously
```

### d) Knowledge Items (KIs)

Mỗi conversation tạo ra KIs tự động. Để maximize hiệu quả:
- Đảm bảo mỗi thành viên dùng **cùng workspace** để KIs được share.
- Tạo KIs thủ công cho kiến thức quan trọng (decisions, gotchas).

---

## 3. Database Stability

### Nguyên tắc Core

1. **Schema-first, Code-second**: Luôn thiết kế schema trước, code sau.
2. **Immutable migrations**: Mỗi migration = 1 file, **không bao giờ sửa migration đã chạy**.
3. **Backward-compatible changes**: Mỗi migration phải tương thích ngược.

### Công cụ đề xuất: Prisma + Supabase

```
packages/db/
├── prisma/
│   ├── schema.prisma       # Single source of truth cho DB schema
│   ├── migrations/         # Auto-generated, immutable
│   │   ├── 20260301_init/
│   │   ├── 20260305_add_roles/
│   │   └── 20260310_add_launcher/
│   └── seed.ts             # Seed data cho development
├── src/
│   ├── client.ts           # Prisma client singleton
│   └── types.ts            # Re-export generated types
└── package.json
```

### Quy tắc Migration an toàn

| Loại thay đổi | An toàn? | Cách làm |
|---|---|---|
| Thêm column (nullable) | ✅ An toàn | `ALTER TABLE ADD COLUMN ... NULL` |
| Thêm column (required) | ⚠️ Cần chiến lược | Thêm nullable → backfill → set NOT NULL |
| Đổi tên column | ❌ Breaking | Thêm column mới → copy data → drop cũ (3-step) |
| Xóa column | ❌ Breaking | Remove code references trước → drop column sau |
| Thêm table | ✅ An toàn | Tạo mới, không ảnh hưởng existing |
| Thêm index | ✅ An toàn | `CREATE INDEX CONCURRENTLY` |

### Expand-Contract Pattern

Khi cần thay đổi breaking:

```
Step 1 (Expand):  Thêm column mới "display_name", giữ "name" cũ
Step 2 (Migrate): Code dùng cả hai, backfill data
Step 3 (Contract): Remove "name" cũ khi 100% code đã dùng "display_name"
```

Mỗi step = 1 PR riêng biệt. Không bao giờ làm cả 3 trong 1 PR.

---

## 4. Git Workflow

### Đề xuất: Trunk-Based + Feature Flags

```
main ──●──●──●──●──●──●──●──●──●──●──
        \   /  \   /     \       /
         ●─●    ●─●       ●───●
       feature-a feature-b  feature-c
       (1 day)   (1 day)    (2 days max)
```

**Quy tắc:**
1. Branch sống **tối đa 2 ngày** → rebase/merge thường xuyên.
2. Feature chưa hoàn thành? → Ẩn sau Feature Flag (đã có `FeatureFlagContext`).
3. **Stacked PRs**: Chia PR lớn thành nhiều PR nhỏ, mỗi PR < 300 dòng.
4. **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `docs:` → auto changelog.

### Phân chia công việc giảm conflict

```
                    ┌─────────────────┐
                    │   shared-types   │  ← Ít thay đổi, review kỹ
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───┐  ┌──────▼─────┐  ┌─────▼──────┐
     │  Member A  │  │  Member B  │  │  Member C  │
     │  Auth/User │  │  Code/IDE  │  │  Hub/Proj  │
     │  /admin/*  │  │  /code/*   │  │  /hub/*    │
     └────────────┘  └────────────┘  └────────────┘
```

Mỗi member "sở hữu" 1 vertical slice → **gần như không bao giờ conflict**.

---

## 5. Cơ Chế Hạn Chế Lỗi với AI Agent

### a) Guardrails

```markdown
## Do NOT
- Modify shared-types without creating an OpenSpec proposal
- Delete or rename existing API endpoints
- Change database schema without migration file
- Remove translation keys (may break other languages)

## Always
- Run `pnpm typecheck` before committing
- Add both vi + en translations simultaneously
- Wrap new pages in AppLayout
- Register new routes in featureRegistry.ts
```

### b) Automated Safety Nets

| Tool | Purpose |
|---|---|
| `pnpm typecheck` | Catch type errors across all packages |
| `pnpm lint` | Consistent code style |
| `openspec validate --strict` | Spec integrity |
| **Husky pre-commit** | Auto-run checks before commit |
| **GitHub Actions CI** | Run full test suite on PR |
| **Changesets** | Track what changed for changelog |

### c) Review Protocol cho AI-generated code

1. AI tạo PR → **Human review required**.
2. AI phải tạo OpenSpec proposal cho thay đổi lớn.
3. AI không được merge trực tiếp vào `main`.
4. Mỗi PR > 200 dòng → yêu cầu AI chia nhỏ.

---

## 6. Tóm Tắt Nhanh

| Vấn đề | Giải pháp |
|---|---|
| Conflict khi nhiều người code | Monorepo + vertical slicing + CODEOWNERS |
| AI Agent thiếu context | `.ai/` context dir + OpenSpec + ADRs |
| Database bị đứt gãy | Prisma migrations + expand-contract pattern |
| Feature dở dang trên main | Feature Flags (đã có sẵn!) |
| Code quality không đều | Shared configs + pre-commit hooks + CI |
| Thay đổi breaking | OpenSpec proposal → review → implement |
| Git conflicts | Trunk-based dev + short-lived branches |
