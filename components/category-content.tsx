"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";
import { notFound } from "next/navigation";
import type { Post } from "@/lib/post-types";

const validSlugs = [
  "core-theories",
  "victims-and-healing",
  "questions-nobody-wants-to-ask",
  "psychology-of-crime",
  "internet-takes",
] as const;

type ValidSlug = typeof validSlugs[number];

interface Props {
  slug: string;
  posts: Post[];
}

export function CategoryContent({ slug, posts }: Props) {
  const { t } = useLanguage();

  if (!validSlugs.includes(slug as ValidSlug)) {
    notFound();
  }

  const cat = t.categories.items[slug as ValidSlug];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12">
        <Link href="/categories" className="label-caps text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", textDecoration: "none" }}>
          {t.categories.title}
        </Link>
        <span className="text-muted-foreground text-xs">→</span>
        <span className="label-caps" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", color: "var(--burgundy)" }}>
          {cat.label}
        </span>
      </div>

      {/* Header */}
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-8">
          <h1 className="leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            {cat.label}
          </h1>
          <div className="w-16 border-t-2 mb-8" style={{ borderColor: "var(--burgundy)" }} />
          <p className="leading-loose text-muted-foreground" style={{ fontSize: "0.95rem", maxWidth: "56ch" }}>
            {cat.longDescription}
          </p>
        </div>
      </div>

      <Separator />

      {/* Articles */}
      <section className="py-16">
        <p className="label-caps text-muted-foreground mb-10" style={{ fontFamily: "var(--font-raleway)" }}>
          {t.categories.articlesLabel}
        </p>

        {posts.length === 0 ? (
          <div className="border border-dashed p-16 text-center" style={{ borderColor: "var(--burgundy)", opacity: 0.4 }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", color: "var(--muted-foreground)" }}>
              {t.categories.articlesComingSoon}
            </p>
            <p className="label-caps text-muted-foreground mt-2" style={{ fontFamily: "var(--font-raleway)" }}>
              {t.categories.articlesDescription}
            </p>
          </div>
        ) : (
          <div className="border-t border-border">
            {posts.map((post) => {
              const wordCount = post.content.split(/\s+/).length;
              const readingMinutes = Math.max(1, Math.round(wordCount / 200));
              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group flex items-start gap-8 py-10 border-b border-border hover:bg-card/40 px-1 -mx-1 transition-colors"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex-1 min-w-0">
                    <h2
                      className="group-hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "1.7rem",
                        fontWeight: 300,
                        lineHeight: 1.2,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{
                        fontSize: "0.92rem",
                        color: "var(--muted-foreground)",
                        lineHeight: 1.7,
                        maxWidth: "62ch",
                        marginBottom: "1rem",
                      }}>
                        {post.excerpt}
                      </p>
                    )}
                    <span style={{
                      fontFamily: "var(--font-raleway)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "var(--burgundy)",
                    }}>
                      Read Essay →
                    </span>
                  </div>
                  <div className="shrink-0 pt-1 text-right">
                    <p style={{
                      fontFamily: "var(--font-raleway)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      opacity: 0.45,
                      marginBottom: "0.3rem",
                    }}>
                      {post.date}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-raleway)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      opacity: 0.35,
                    }}>
                      {readingMinutes} min
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
