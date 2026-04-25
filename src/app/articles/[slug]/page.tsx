import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllArticles, getArticleBySlug, getArticlesBySeries } from "@/lib/content";
import { getMDXComponents } from "@/components/mdx";
import { getBookmarkStatus } from "@/actions/bookmarks";
import { getReactionCounts, getUserReactions } from "@/actions/reactions";
import { CommentSection } from "@/components/comments/CommentSection";
import { ViewTracker } from "@/components/articles/ViewTracker";
import { BookmarkButton } from "@/components/articles/BookmarkButton";
import { ReactionBar } from "@/components/articles/ReactionBar";
import { Tag } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  const { title, excerpt, coverImage, tags } = article.frontmatter;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      ...(coverImage && { images: [{ url: coverImage }] }),
    },
    keywords: tags,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, body, readingTime } = article;

  const seriesArticles = frontmatter.series
    ? getArticlesBySeries(frontmatter.series)
    : [];

  const [bookmarked, reactionCounts, userReactions] = await Promise.all([
    getBookmarkStatus(slug),
    getReactionCounts(slug),
    getUserReactions(slug),
  ]);

  return (
    <article className={styles.article}>
      <ViewTracker slug={slug} />

      <header
        className={
          frontmatter.coverImage ? styles.heroHeader : styles.textHeader
        }
      >
        {frontmatter.coverImage && (
          <div className={styles.hero}>
            <Image
              src={frontmatter.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
            <div className={styles.heroScrim} aria-hidden />
          </div>
        )}
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <div className={styles.meta}>
            <time>{format(frontmatter.publishedAt, "MMM d, yyyy")}</time>
            <span className={styles.metaDot}>&middot;</span>
            <span>{readingTime}</span>
            <span className={styles.metaDot}>&middot;</span>
            <Link href={`/category/${frontmatter.category}`}>
              {frontmatter.category}
            </Link>
          </div>
          {frontmatter.tags.length > 0 && (
            <div className={styles.tags}>
              {frontmatter.tags.map((tag) => (
                <Tag key={tag} label={tag} color="default" />
              ))}
            </div>
          )}
        </div>
      </header>

      {seriesArticles.length > 1 && (
        <nav className={styles.series}>
          <h3>Series: {frontmatter.series}</h3>
          <ol>
            {seriesArticles.map((a) => (
              <li key={a.slug}>
                {a.slug === slug ? (
                  <strong>{a.frontmatter.title}</strong>
                ) : (
                  <Link href={`/articles/${a.slug}`}>
                    {a.frontmatter.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={styles.content}>
        <MDXRemote
          source={body}
          components={getMDXComponents()}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, { theme: "one-dark-pro" }],
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.interactions}>
          <ReactionBar
            articleSlug={slug}
            initialCounts={reactionCounts}
            initialUserReactions={userReactions}
          />
          <BookmarkButton articleSlug={slug} initialBookmarked={bookmarked} />
        </div>

        <Suspense fallback={<p style={{ color: "var(--muted)" }}>Loading comments...</p>}>
          <CommentSection articleSlug={slug} />
        </Suspense>
      </footer>
    </article>
  );
}
