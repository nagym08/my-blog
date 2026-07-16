# my-blog

A personal coding blog built on Next.js 16 and React 19. Articles are authored in MDX (see `content/`) and rendered with syntax-highlighted code via `rehype-pretty-code`. The app ships with authentication (NextAuth + Drizzle adapter on Postgres), full-text search powered by Fuse.js, tag-based categorization, and a custom "Crisp Technical" design system (clean, light-by-default with a light/dark toggle) documented in [`DESIGN.md`](./DESIGN.md). UI components live under `src/components/ui/` and are developed in isolation with Storybook.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Content:** MDX via `next-mdx-remote`, `remark-gfm`, `rehype-pretty-code`
- **Auth & DB:** NextAuth v5 + Drizzle ORM + Postgres
- **Search:** Fuse.js
- **UI/Docs:** Storybook 10 + Vitest (browser mode with Playwright)
- **Styling:** CSS Modules with a custom design-token system

## Getting Started

Install dependencies:

```bash
bun install
# or: npm install
```

Create a `.env.local` file with your database URL and auth secrets (see `drizzle.config.ts` and the NextAuth setup for the expected variables).

Run the database migrations:

```bash
bun run db:generate   # generate migrations from the schema
bun run db:migrate    # apply them to your database
```

Start the dev server:

```bash
bun run dev
```

The app runs on [http://localhost:3001](http://localhost:3001) (note: port **3001**, not the Next.js default).

### Other useful scripts

```bash
bun run build            # production build
bun run start            # start the production server
bun run lint             # eslint
bun run storybook        # Storybook on :6006
bun run build-storybook  # static Storybook build
bun run db:studio        # Drizzle Studio
```

### Docker

A `Dockerfile` and `compose.yml` are provided for containerized runs:

```bash
docker compose up --build
```

## Project Structure

```
src/
  app/              # Next.js App Router routes
  components/
    layout/         # Header, Footer, Nav, AuthButton
    ui/             # Design-system primitives (Button, Card, Tag, ...)
    articles/      
content/            # MDX articles
skills/             # TDD / design guidelines consumed by CLAUDE.md
DESIGN.md           # "Crisp Technical" design system spec
```

## A Note on How This Was Built

This project is **fully vibecoded**. Every line — the architecture, the schema, the components, the design system, even this README — was produced through conversational pair-programming with AI agents, steered by taste and intent rather than hand-written from scratch. It's an experiment in what a modern web app looks like when the human stays in the driver's seat but never touches the keyboard for the grunt work.
