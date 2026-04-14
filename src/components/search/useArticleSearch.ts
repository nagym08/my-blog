import { useMemo, useCallback } from "react";
import Fuse from "fuse.js";

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
}

export function useArticleSearch(index: SearchItem[]) {
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "excerpt", weight: 0.3 },
          { name: "tags", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
      }),
    [index]
  );

  return useCallback(
    (q: string) => {
      const trimmed = q.trim();
      return trimmed ? fuse.search(trimmed).map((r) => r.item) : [];
    },
    [fuse]
  );
}
