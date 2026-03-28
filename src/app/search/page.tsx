import type { Metadata } from "next";
import { getAllArticles, getSearchIndex } from "@/lib/content";
import { SearchBar } from "@/components/search/SearchBar";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  const searchIndex = getSearchIndex();
  const articles = getAllArticles();

  return (
    <>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        Search
      </h1>
      <SearchBar searchIndex={searchIndex} articles={articles} />
    </>
  );
}
