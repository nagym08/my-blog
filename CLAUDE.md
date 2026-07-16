# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@skills/SKILL.md

## Commands

```bash
bun run dev              # Dev server on localhost:3001
bun run build            # Production build
bun run lint             # ESLint (flat config, no args needed)
bun run storybook        # Storybook on localhost:6006
npx vitest               # Run all tests (Storybook stories via vitest browser mode)
npx vitest -t "Button"   # Run a single test by name pattern

bun run db:generate      # Generate Drizzle migrations from schema
bun run db:migrate       # Apply migrations to Postgres
bun run db:studio        # Open Drizzle Studio
```

All `db:*` scripts read `DATABASE_URL` from `.env.local` via `dotenv-cli`.

## Architecture

**Next.js 16 App Router + React 19** blog with MDX content, Postgres-backed auth and engagement features.

### Content pipeline
MDX articles live in `content/{category}/` where categories are `project`, `coding`, `developer-growth`, `life` (diabetes/sport/personal). Category slugs are single-source in `src/lib/content.schema.ts`; display metadata (nav labels, tag color, description) lives in `src/lib/categories.ts` (`CATEGORY_META`/`NAV_ITEMS`), which nav, search, and category pages all import. Frontmatter is validated by Zod (`src/lib/content.schema.ts`). The content layer (`src/lib/content.ts`) reads files from disk, parses with `gray-matter`, and exposes cached functions (`getAllArticles`, `getArticleBySlug`, `getArticlesByCategory`, `getArticlesBySeries`, `getSearchIndex`). Draft articles are excluded in production.

### Database
Drizzle ORM with Postgres. Schema at `src/db/schema.ts`, migrations in `src/db/migrations/`. Tables: Auth.js tables (`user`, `account`, `session`, `verificationToken`) plus application tables (`comment` with threaded replies, `article_view_count`, `bookmark`, `article_reaction`). DB connection via `src/lib/db.ts`.

### Auth
NextAuth v5 (`src/lib/auth.ts`) with GitHub and Google providers. Drizzle adapter. Database sessions. User roles stored in `user.role` column and exposed on the session object. Custom sign-in page at `/auth/signin`.

### Search
Client-side via Fuse.js. `getSearchIndex()` provides the dataset; search UI at `/search`.

### UI & testing
Design system ("Crisp Technical") is specified in `DESIGN.md` — clean, light-by-default with a light/dark toggle (`data-theme` on `<html>`; a no-FOUC inline script in `layout.tsx` sets it before paint, `ThemeToggle` flips it), one semantic CSS-variable token set (light in `:root`, dark under `[data-theme="dark"]`), hairline borders, flat surfaces, single soft shadow — no glassmorphism/glow/gradients. CSS Modules for styling. Components in `src/components/ui/` have co-located `.stories.tsx` files. Tests run through Vitest with Storybook's vitest addon in headless Playwright browser mode (`vitest.config.ts`).

### Routes
- `/` — home (article list)
- `/articles/[slug]` — article page
- `/category/[category]` — filtered by category
- `/search` — search page
- `/about` — about page
- `/auth/signin`, `/auth/error` — auth pages
- `/api/auth/[...nextauth]` — NextAuth API route

### Key path aliases
`@/` maps to `src/` (e.g., `@/components/`, `@/lib/`, `@/db/`).
