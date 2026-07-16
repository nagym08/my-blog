import { CATEGORIES, type Category } from "./content.schema";
import type { TagColor } from "@/components/ui/Tag/Tag";

export interface CategoryMeta {
  /** Short label for the top nav. */
  navLabel: string;
  /** Full label for category page headers and metadata. */
  fullLabel: string;
  /** Tag color used for this category's chip. */
  color: TagColor;
  /** Optional blurb shown on the category page. */
  description?: string;
}

/**
 * Single source of truth for category display metadata. `CATEGORIES` (the slugs)
 * lives in content.schema.ts; this adds presentation concerns. Nav, search
 * labels, category pages, and card tag colors all derive from here.
 */
export const CATEGORY_META: Record<Category, CategoryMeta> = {
  coding: { navLabel: "Coding", fullLabel: "Coding", color: "typescript" },
  project: { navLabel: "Projects", fullLabel: "Projects", color: "frontend" },
  "developer-growth": {
    navLabel: "Dev Growth",
    fullLabel: "Developer Growth",
    color: "dev-growth",
  },
  life: {
    navLabel: "Life",
    fullLabel: "Life",
    color: "life",
    description: "Notes on diabetes, sport, and life beyond the code.",
  },
};

/** Nav items derived from CATEGORIES, in declaration order. */
export const NAV_ITEMS = CATEGORIES.map((category) => ({
  label: CATEGORY_META[category].navLabel,
  href: `/category/${category}`,
}));
