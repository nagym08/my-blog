import type { Metadata } from "next";
import { getAllArticles, getSearchIndex } from "@/lib/content";
import { PageHeader } from "@/components/ui";
import { SearchBar } from "@/components/search/SearchBar";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchIndex = getSearchIndex();
  const articles = getAllArticles();

  return (
    <>
      <PageHeader eyebrow="Find articles" title="Search" />
      <SearchBar
        searchIndex={searchIndex}
        articles={articles}
        initialQuery={q ?? ""}
      />
    </>
  );
}
