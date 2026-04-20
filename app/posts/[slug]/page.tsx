import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/post-types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Maria Agrafiotis`,
      description: post.excerpt,
      url: `https://mariaagrafiotis.com/posts/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://mariaagrafiotis.com/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORIES.find((c) => c.slug === post.category);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Maria Agrafiotis",
      url: "https://mariaagrafiotis.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Maria Agrafiotis",
    },
    url: `https://mariaagrafiotis.com/posts/${slug}`,
  };

  const wordCount = post.content.split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="max-w-3xl mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-14">
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              opacity: 0.7,
            }}
            className="hover:opacity-100 transition-opacity"
          >
            Home
          </Link>
          <span style={{ opacity: 0.4, fontSize: "0.7rem" }}>→</span>
          <Link
            href={`/categories/${post.category}`}
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              opacity: 0.7,
            }}
            className="hover:opacity-100 transition-opacity"
          >
            {cat?.label ?? post.category}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <p
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--burgundy)",
              marginBottom: "1.2rem",
            }}
          >
            {cat?.label ?? post.category}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.25rem",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--muted-foreground)",
                marginBottom: "1.5rem",
                maxWidth: "52ch",
              }}
            >
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4">
            <span
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              {post.date}
            </span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              {readingMinutes} min read
            </span>
          </div>
          <div className="mt-8 border-t" style={{ borderColor: "var(--burgundy)", opacity: 0.4 }} />
        </header>

        {/* Content */}
        <div className="post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer nav */}
        <div className="mt-20 pt-10 border-t border-border flex items-center justify-between">
          <Link
            href={`/categories/${post.category}`}
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--burgundy)",
              textDecoration: "none",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            ← More in {cat?.label ?? post.category}
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              opacity: 0.5,
              textDecoration: "none",
              color: "inherit",
            }}
            className="hover:opacity-100 transition-opacity"
          >
            All Categories →
          </Link>
        </div>
      </article>
    </>
  );
}
