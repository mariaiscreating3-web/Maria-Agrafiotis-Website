"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";
import type { Post } from "@/lib/post-types";
import { CATEGORIES } from "@/lib/post-types";

interface Props {
  featuredPost?: Post;
  recentPosts: Post[];
}

export function HomeContent({ featuredPost, recentPosts }: Props) {
  const { t } = useLanguage();

  return (
    <div>
      {/* ── INTRO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <div className="space-y-4 leading-loose text-muted-foreground" style={{ fontSize: "0.95rem", maxWidth: "42ch" }}>
              <p>{t.homepage.intro1}</p>
              <p>{t.homepage.intro2}</p>
              <p>{t.homepage.intro3}</p>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <div className="border-l-2 pl-6 py-2" style={{ borderColor: "var(--burgundy)" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.25rem", lineHeight: "1.8" }}>
                {t.homepage.pullQuote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── FEATURED ARTICLE ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="label-caps text-muted-foreground mb-10" style={{ fontFamily: "var(--font-raleway)" }}>
          {t.homepage.featuredDescription}
        </p>

        {featuredPost ? (
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="hover:opacity-70 transition-opacity inline-block"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2 style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              lineHeight: 1.2,
            }}>
              {featuredPost.title}
            </h2>
          </Link>
        ) : (
          <div className="border border-dashed p-14 text-center" style={{ borderColor: "var(--burgundy)", opacity: 0.45 }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--muted-foreground)" }}>
              {t.homepage.featuredComingSoon}
            </p>
          </div>
        )}
      </section>

      <Separator />

      {/* ── RECENT POSTS ── */}
      {recentPosts.length > 0 && (
        <>
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex items-baseline justify-between mb-10">
              <p className="label-caps" style={{ fontFamily: "var(--font-raleway)" }}>
                Recent Essays
              </p>
            </div>
            <div className="border-t border-border">
              {recentPosts.map((post) => {
                const cat = CATEGORIES.find((c) => c.slug === post.category);
                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group flex items-start gap-8 py-8 border-b border-border hover:bg-card/40 px-1 -mx-1 transition-colors"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p style={{
                        fontFamily: "var(--font-raleway)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--burgundy)",
                        marginBottom: "0.6rem",
                        opacity: 0.8,
                      }}>
                        {cat?.label ?? post.category}
                      </p>
                      <p
                        className="group-hover:opacity-70 transition-opacity"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontSize: "1.35rem",
                          fontWeight: 400,
                          lineHeight: 1.3,
                          marginBottom: "0.6rem",
                        }}
                      >
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p style={{
                          fontSize: "0.88rem",
                          color: "var(--muted-foreground)",
                          lineHeight: 1.6,
                          maxWidth: "60ch",
                        }}>
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 pt-1">
                      <p style={{
                        fontFamily: "var(--font-raleway)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        opacity: 0.45,
                      }}>
                        {post.date}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
          <Separator />
        </>
      )}

      {/* ── CONTACT TEASER ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
              {t.homepage.letsTalk}
            </p>
            <h2 className="leading-tight mb-6 whitespace-pre-line" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {t.homepage.theseConversations}
            </h2>
            <p className="text-muted-foreground leading-loose mb-8" style={{ fontSize: "0.9rem" }}>
              {t.homepage.silenceText}
            </p>
            <Link href="/contact" className="ContactBtn inline-block label-caps px-8 py-3 border transition-all" style={{ fontFamily: "var(--font-raleway)", borderColor: "var(--burgundy)", color: "var(--burgundy)" }}>
              {t.homepage.startConversation}
            </Link>
          </div>
          <div className="border-l-2 pl-10 py-4" style={{ borderColor: "var(--burgundy)" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", lineHeight: "1.85", color: "var(--muted-foreground)" }}>
              {t.homepage.talkQuote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
