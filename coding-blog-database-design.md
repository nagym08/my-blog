# Coding blog database design

## Overview

Database schema for a personal coding blog with three content sections, OAuth authentication, threaded comments, post series, tagging, bookmarks, and reactions.

### Content sections

| Section | Category enum | Description |
|---|---|---|
| Technical | `technical` | Short technical entries, TILs, code snippets |
| Project | `project` | Updates on a personal project (typically grouped into a series) |
| Methodology | `methodology` | Software dev methodology and developer growth posts |

---

## Tables

### users

Primary user table. Supports both traditional and OAuth-only accounts.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| username | VARCHAR(50) | UNIQUE, NOT NULL | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| password_hash | VARCHAR(255) | NULLABLE | Null for OAuth-only users |
| display_name | VARCHAR(100) | NOT NULL | |
| bio | TEXT | NULLABLE | |
| avatar_url | VARCHAR(500) | NULLABLE | Can be auto-populated from OAuth provider |
| github_url | VARCHAR(500) | NULLABLE | |
| website_url | VARCHAR(500) | NULLABLE | |
| role | ENUM('admin', 'author', 'reader') | NOT NULL, DEFAULT 'reader' | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

### auth_providers

Stores OAuth provider connections. One user can link multiple providers.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NOT NULL | ON DELETE CASCADE |
| provider | ENUM('github', 'google', 'twitter') | NOT NULL | |
| provider_user_id | VARCHAR(255) | NOT NULL | External user ID from the provider |
| access_token | VARCHAR(500) | NOT NULL | |
| refresh_token | VARCHAR(500) | NULLABLE | Not all providers issue refresh tokens |
| token_expires_at | TIMESTAMP | NULLABLE | |
| profile_data | JSON | NULLABLE | Raw profile payload from provider |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Unique constraint:** `(provider, provider_user_id)` — prevents linking the same external account to multiple users.

### posts

Core content table. Stores both raw Markdown and pre-rendered HTML.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| author_id | UUID | FK → users.id, NOT NULL | |
| series_id | UUID | FK → series.id, NULLABLE | Null if post is standalone |
| title | VARCHAR(255) | NOT NULL | |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly identifier |
| excerpt | TEXT | NULLABLE | Short summary / preview text |
| content_markdown | TEXT | NOT NULL | Raw Markdown source |
| content_html | TEXT | NOT NULL | Pre-rendered HTML (avoids rendering on every request) |
| category | ENUM('technical', 'project', 'methodology') | NOT NULL | Maps to the three blog sections |
| series_order | INT | NULLABLE | Position within a series |
| cover_image_url | VARCHAR(500) | NULLABLE | |
| status | ENUM('draft', 'published', 'archived') | NOT NULL, DEFAULT 'draft' | |
| reading_time_min | INT | NOT NULL, DEFAULT 0 | Pre-calculated reading time |
| view_count | INT | NOT NULL, DEFAULT 0 | |
| published_at | TIMESTAMP | NULLABLE | Set when status changes to 'published' |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

### series

Groups related posts into ordered sequences (e.g., "Building a CLI in Go, Parts 1–5").

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| title | VARCHAR(255) | NOT NULL | |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | |
| description | TEXT | NULLABLE | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

### tags

Freeform labels for cross-cutting topics (e.g., "python", "testing", "architecture").

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| name | VARCHAR(50) | UNIQUE, NOT NULL | |
| slug | VARCHAR(50) | UNIQUE, NOT NULL | |
| color | VARCHAR(7) | NULLABLE | Hex color for badge rendering |

### post_tags

Junction table for the many-to-many relationship between posts and tags.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| post_id | UUID | FK → posts.id, NOT NULL | ON DELETE CASCADE |
| tag_id | UUID | FK → tags.id, NOT NULL | ON DELETE CASCADE |

**Primary key:** `(post_id, tag_id)`

### comments

Threaded comments with self-referencing parent for nested replies.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| post_id | UUID | FK → posts.id, NOT NULL | ON DELETE CASCADE |
| author_id | UUID | FK → users.id, NOT NULL | |
| parent_id | UUID | FK → comments.id, NULLABLE | Null = top-level comment; set = reply |
| body | TEXT | NOT NULL | |
| is_edited | BOOLEAN | NOT NULL, DEFAULT FALSE | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

### bookmarks

Lets readers save posts for later reading.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NOT NULL | ON DELETE CASCADE |
| post_id | UUID | FK → posts.id, NOT NULL | ON DELETE CASCADE |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Unique constraint:** `(user_id, post_id)` — one bookmark per user per post.

### post_reactions

Enum-based reaction system supporting multiple reaction types.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID | PK | |
| post_id | UUID | FK → posts.id, NOT NULL | ON DELETE CASCADE |
| user_id | UUID | FK → users.id, NOT NULL | ON DELETE CASCADE |
| type | ENUM('like', 'clap', 'fire') | NOT NULL | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |

**Unique constraint:** `(post_id, user_id, type)` — one reaction of each type per user per post.

---

## Relationships

```
users         1 ──── * posts            (author_id)
users         1 ──── * comments         (author_id)
users         1 ──── * bookmarks        (user_id)
users         1 ──── * post_reactions   (user_id)
users         1 ──── * auth_providers   (user_id)
posts         1 ──── * comments         (post_id)
posts         1 ──── * post_tags        (post_id)
posts         1 ──── * bookmarks        (post_id)
posts         1 ──── * post_reactions   (post_id)
posts         * ───── 0..1 series       (series_id, nullable)
tags          1 ──── * post_tags        (tag_id)
comments      1 ──── * comments         (parent_id, self-referencing)
```

---

## Indexes (recommended)

| Table | Index | Columns | Purpose |
|---|---|---|---|
| posts | idx_posts_slug | slug | Fast lookup by URL slug |
| posts | idx_posts_category_status | category, status | Section page queries |
| posts | idx_posts_published | published_at DESC | Chronological listing |
| posts | idx_posts_series | series_id, series_order | Ordered series display |
| post_tags | idx_post_tags_tag | tag_id | Tag-based filtering |
| comments | idx_comments_post | post_id, created_at | Comment thread loading |
| auth_providers | idx_auth_provider_lookup | provider, provider_user_id | OAuth login lookup |
| bookmarks | idx_bookmarks_user | user_id | User's saved posts |

---

## Auth flow (OAuth)

1. User clicks "Sign in with GitHub/Google"
2. Backend redirects to provider's OAuth consent screen
3. Provider redirects back with authorization code
4. Backend exchanges code for access token + profile data
5. Look up `auth_providers` by `(provider, provider_user_id)`
   - **Found:** Log in as the linked user, update tokens
   - **Not found:** Create new `users` row (pull display_name, avatar_url from profile), insert `auth_providers` row
6. Issue session token / JWT

Users can link additional providers to the same account later.

---

## Design notes

- **password_hash is nullable** to support OAuth-only signups. Users can optionally set a password later.
- **content_markdown + content_html** are stored side by side. Markdown is the source of truth; HTML is pre-rendered on save to avoid rendering cost on every page load.
- **category enum** provides hard structure for the three blog sections. Tags remain flexible for cross-cutting topics.
- **series_order on posts** (not on series) so each post knows its position within the series.
- **reading_time_min** is pre-calculated on save based on word count.
- **view_count** is denormalized for performance. Consider a separate `post_views` table if you need analytics granularity.
- All primary keys use UUIDs for portability and to avoid sequential ID enumeration.
- All foreign keys with user data use `ON DELETE CASCADE` for GDPR-friendly user deletion.
