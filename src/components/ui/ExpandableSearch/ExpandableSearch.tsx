"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { SearchInput } from "@/components/ui/SearchInput/SearchInput";
import { useArticleSearch } from "@/components/search/useArticleSearch";
import type { SearchItem } from "@/components/search/useArticleSearch";
import styles from "./ExpandableSearch.module.css";

export interface ExpandableSearchProps {
  searchIndex: SearchItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  coding: "Coding",
  project: "Projects",
  "developer-growth": "Dev Growth",
};

export function ExpandableSearch({ searchIndex }: ExpandableSearchProps) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const search = useArticleSearch(searchIndex);

  const results = query.trim() ? search(query).slice(0, 5) : [];
  const showDropdown = expanded && query.trim().length > 0;
  const seeAllHref = `/search?q=${encodeURIComponent(query)}`;

  const collapse = useCallback(() => {
    setExpanded(false);
    setQuery("");
  }, []);

  // Outside-click always collapses
  useEffect(() => {
    if (!expanded) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        collapse();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [expanded, collapse]);

  // Blur with empty input collapses (e.g. tab-out)
  const handleContainerBlur = useCallback(
    (e: React.FocusEvent) => {
      if (containerRef.current?.contains(e.relatedTarget as Node)) return;
      if (!query.trim()) collapse();
    },
    [query, collapse]
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        collapse();
        return;
      }
      if (e.key === "ArrowDown" && showDropdown) {
        e.preventDefault();
        const first = containerRef.current?.querySelector<HTMLElement>(
          '[role="option"]'
        );
        first?.focus();
      }
    },
    [collapse, showDropdown]
  );

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Escape") {
        e.preventDefault();
        collapse();
        containerRef.current?.querySelector<HTMLInputElement>("input")?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const options = containerRef.current?.querySelectorAll<HTMLElement>(
          '[role="option"]'
        );
        options?.[index + 1]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (index === 0) {
          containerRef.current
            ?.querySelector<HTMLInputElement>("input")
            ?.focus();
        } else {
          const options = containerRef.current?.querySelectorAll<HTMLElement>(
            '[role="option"]'
          );
          options?.[index - 1]?.focus();
        }
      }
    },
    [collapse]
  );

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, expanded && styles.expanded)}
      onBlur={handleContainerBlur}
    >
      {!expanded ? (
        <button
          className={styles.trigger}
          aria-label="Search"
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      ) : (
        <form
          className={styles.inputWrapper}
          role="search"
          action="/search"
          method="get"
        >
          <SearchInput
            name="q"
            value={query}
            onSearch={setQuery}
            placeholder="Search articles..."
            autoFocus
            onKeyDown={handleInputKeyDown}
            aria-label="Search articles"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />
          {showDropdown && (
            <div
              className={styles.dropdown}
              role="listbox"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <>
                  <div className={styles.noResults}>
                    No results for &ldquo;{query}&rdquo;
                  </div>
                  <Link
                    href={seeAllHref}
                    role="option"
                    className={clsx(styles.seeAll, styles.noResultsSeeAll)}
                    onKeyDown={(e) => handleOptionKeyDown(e, 0)}
                  >
                    See full search →
                  </Link>
                </>
              ) : (
                <>
                  {results.map((item, i) => (
                    <Link
                      key={item.slug}
                      href={`/articles/${item.slug}`}
                      role="option"
                      className={styles.resultRow}
                      onKeyDown={(e) => handleOptionKeyDown(e, i)}
                    >
                      <span className={styles.resultTitle}>{item.title}</span>
                      <span className={styles.resultMeta}>
                        <span className={styles.category}>
                          {CATEGORY_LABELS[item.category] ?? item.category}
                        </span>
                        <span className={styles.excerpt}>{item.excerpt}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={seeAllHref}
                    role="option"
                    className={styles.seeAll}
                    onKeyDown={(e) =>
                      handleOptionKeyDown(e, results.length)
                    }
                  >
                    See all results →
                  </Link>
                </>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
