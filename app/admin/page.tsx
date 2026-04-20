"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import type { Post } from "@/lib/post-types";

export default function AdminOverview() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;
  const featured = posts.filter((p) => p.featured).length;

  const stats = [
    { label: "Total Posts", value: posts.length },
    { label: "Published", value: published },
    { label: "Drafts", value: drafts },
    { label: "Featured", value: featured },
  ];

  const recent = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 sm:mb-10 flex items-end justify-between gap-4">
        <div>
          <p style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.4rem" }}>
            Admin
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontWeight: 300, lineHeight: 1 }}>
            Overview
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 transition-all shrink-0"
          style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid var(--burgundy)", color: "var(--burgundy)", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--burgundy)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--background)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--burgundy)"; }}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Post</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Stats — 2×2 on mobile, 4×1 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-border mb-8 sm:mb-10">
        {stats.map((s) => (
          <div key={s.label} className="border-r border-b border-border p-4 sm:p-6">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 300, lineHeight: 1, color: "var(--burgundy)" }}>
              {s.value}
            </p>
            <p className="mt-1 opacity-60" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div>
        <p className="mb-5" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
          Recent Posts
        </p>

        {recent.length === 0 ? (
          <div className="border border-dashed border-border p-8 sm:p-10 text-center">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", opacity: 0.5 }}>No posts yet</p>
            <Link href="/admin/posts/new" className="mt-3 inline-block" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--burgundy)", textDecoration: "none" }}>
              Write your first post →
            </Link>
          </div>
        ) : (
          <div className="border-t border-border">
            {recent.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-4 border-b border-border gap-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 400 }}>
                    {post.title || "Untitled"}
                  </p>
                  <p className="mt-0.5 opacity-50" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {post.date} · {post.category.replace(/-/g, " ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <span className="hidden sm:inline px-2 py-0.5" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", background: post.published ? "var(--burgundy)" : "transparent", color: post.published ? "var(--background)" : "inherit", border: "1px solid", borderColor: post.published ? "var(--burgundy)" : "var(--border)", opacity: post.published ? 1 : 0.5 }}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full sm:hidden shrink-0" style={{ background: post.published ? "var(--burgundy)" : "var(--border)" }} />
                  <Link href={`/admin/posts/${post.id}`} style={{ fontFamily: "var(--font-raleway)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--burgundy)", textDecoration: "none" }}>
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
