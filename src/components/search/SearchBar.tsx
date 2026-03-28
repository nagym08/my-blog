"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { ArticleMeta } from "@/lib/content";
import styles from "./SearchBar.module.css";

interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
}

export function SearchBar({
  searchIndex,
  articles,
}: {
  searchIndex: SearchItem[];
  articles: ArticleMeta[];
}) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "excerpt", weight: 0.3 },
          { name: "tags", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
      }),
    [searchIndex]
  );

  const articleMap = useMemo(
    () => new Map(articles.map((a) => [a.slug, a])),
    [articles]
  );

  const results = query.trim()
    ? fuse.search(query).map((r) => articleMap.get(r.item.slug)!)
    : [];

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className={styles.input}
        autoFocus
      />
      {query.trim() && (
        <p className={styles.count}>
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}
      <div>
        {results.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
