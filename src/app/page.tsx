import { desc } from "drizzle-orm";
import { getAllArticles, getArticleBySlug, toMeta } from "@/lib/content";
import { ArticleList } from "@/components/articles/ArticleList";
import { db } from "@/lib/db";
import { articleViewCounts } from "@/db/schema";
import type { ArticleMeta } from "@/lib/content";

async function getMostPopular(limit: number): Promise<ArticleMeta[]> {
  const rows = await db
    .select({ articleSlug: articleViewCounts.articleSlug })
    .from(articleViewCounts)
    .orderBy(desc(articleViewCounts.count))
    .limit(limit);

  const articles: ArticleMeta[] = [];
  for (const row of rows) {
    const article = getArticleBySlug(row.articleSlug);
    if (article) {
      articles.push(toMeta(article));
    }
  }
  return articles;
}

export default async function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 6);
  const popular = await getMostPopular(6);

  return (
    <>
      <ArticleList articles={latest} heading="Latest Articles" />
      {popular.length > 0 && (
        <ArticleList articles={popular} heading="Most Popular" />
      )}
    </>
  );
}
