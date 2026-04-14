"use client";

import { useEffect, useMemo, useState } from "react";
import { useArticleSearch } from "./useArticleSearch";
import type { SearchItem } from "./useArticleSearch";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { ArticleMeta } from "@/lib/content";
import styles from "./SearchBar.module.css";

export function SearchBar({
  searchIndex,
  articles,
  initialQuery = "",
}: {
  searchIndex: SearchItem[];
  articles: ArticleMeta[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const search = useArticleSearch(searchIndex);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const articleMap = useMemo(
    () => new Map(articles.map((a) => [a.slug, a])),
    [articles]
  );

  const results = query.trim()
    ? search(query)
        .map((item) => articleMap.get(item.slug)!)
        .filter(Boolean)
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
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
          {query}&rdquo;
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
