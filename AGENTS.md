<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

Also review `skills/SKILL.md` when the task involves test-driven development.

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

Next.js 16 App Router + React 19 blog with MDX content, Postgres-backed auth, and engagement features.

### Content Pipeline

MDX articles live in `content/{category}/` where categories are `project`, `coding`, and `developer-growth`. Frontmatter is validated by Zod in `src/lib/content.schema.ts`. The content layer in `src/lib/content.ts` reads files from disk, parses with `gray-matter`, and exposes cached functions:

- `getAllArticles`
- `getArticleBySlug`
- `getArticlesByCategory`
- `getArticlesBySeries`
- `getSearchIndex`

Draft articles are excluded in production.

### Database

Drizzle ORM with Postgres. Schema lives at `src/db/schema.ts`; migrations live in `src/db/migrations/`.

Tables include Auth.js tables (`user`, `account`, `session`, `verificationToken`) plus application tables:

- `comment` with threaded replies
- `article_view_count`
- `bookmark`
- `article_reaction`

Database connection is configured in `src/lib/db.ts`.

### Auth

NextAuth v5 in `src/lib/auth.ts` with GitHub and Google providers. The app uses the Drizzle adapter and database sessions. User roles are stored in the `user.role` column and exposed on the session object. The custom sign-in page is at `/auth/signin`.

### Search

Search is client-side via Fuse.js. `getSearchIndex()` provides the dataset; the search UI is at `/search`.

### UI And Testing

The design system, "Crisp Technical", is specified in `DESIGN.md`: a clean, light-by-default look with a light/dark toggle (`data-theme` on `<html>`, driven by `ThemeToggle`), semantic CSS-variable tokens, hairline borders, flat surfaces, and a single soft shadow — no glassmorphism, glow, or gradients. CSS Modules are used for styling. Components in `src/components/ui/` have co-located `.stories.tsx` files.

Tests run through Vitest with Storybook's Vitest addon in headless Playwright browser mode (`vitest.config.ts`).

### Routes

- `/` - home article list
- `/articles/[slug]` - article page
- `/category/[category]` - filtered by category
- `/search` - search page
- `/about` - about page
- `/auth/signin` and `/auth/error` - auth pages
- `/api/auth/[...nextauth]` - NextAuth API route

### Key Path Aliases

`@/` maps to `src/`, for example `@/components/`, `@/lib/`, and `@/db/`.
