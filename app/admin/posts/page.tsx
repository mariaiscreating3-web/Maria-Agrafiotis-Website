"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
import type { Post } from "@/lib/post-types";
import { CATEGORIES } from "@/lib/post-types";

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts([...data].sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .catch(() => {});
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  async function togglePublished(post: Post) {
    const updated = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    }).then((r) => r.json());
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  const filtered = filter === "all" ? posts : filter === "published" ? posts.filter((p) => p.published) : posts.filter((p) => !p.published);

  const labelStyle = { fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" as const };

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4">
        <div>
          <p style={{ ...labelStyle, opacity: 0.5, marginBottom: "0.4rem" }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontWeight: 300, lineHeight: 1 }}>
            All Posts
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 transition-all shrink-0"
          style={{ ...labelStyle, border: "1px solid var(--burgundy)", color: "var(--burgundy)", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--burgundy)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--background)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--burgundy)"; }}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Post</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-border mb-6 overflow-x-auto">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 sm:px-5 py-2.5 bg-transparent border-0 cursor-pointer transition-all whitespace-nowrap"
            style={{ ...labelStyle, borderBottom: filter === f ? "2px solid var(--burgundy)" : "2px solid transparent", color: filter === f ? "var(--burgundy)" : "inherit", opacity: filter === f ? 1 : 0.45, marginBottom: "-1px" }}
          >
            {f === "all" ? `All (${posts.length})` : f === "published" ? `Published (${posts.filter((p) => p.published).length})` : `Drafts (${posts.filter((p) => !p.published).length})`}
          </button>
        ))}
      </div>

      {/* Posts list */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-border p-10 sm:p-12 text-center">
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", opacity: 0.5 }}>No posts here yet</p>
        </div>
      ) : (
        <div className="border-t border-border">
          {filtered.map((post) => {
            const cat = CATEGORIES.find((c) => c.slug === post.category);
            return (
              <div key={post.id} className="group flex items-center gap-3 py-4 border-b border-border hover:bg-card/50 px-1 transition-colors -mx-1">
                {/* Status dot */}
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: post.published ? "var(--burgundy)" : "var(--border)" }} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 400 }}>
                    {post.title || "Untitled"}
                    {post.featured && (
                      <span className="ml-2 hidden sm:inline" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--burgundy)", verticalAlign: "middle" }}>★ Featured</span>
                    )}
                  </p>
                  <p style={{ ...labelStyle, opacity: 0.45, fontSize: "0.57rem" }}>
                    {post.date}{cat ? ` · ${cat.label}` : ""}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={() => togglePublished(post)}
                    className="px-2 sm:px-2.5 py-1 border bg-transparent cursor-pointer transition-all"
                    style={{ ...labelStyle, fontSize: "0.55rem", borderColor: post.published ? "var(--burgundy)" : "var(--border)", color: post.published ? "var(--burgundy)" : "inherit", opacity: post.published ? 1 : 0.5 }}
                  >
                    {post.published ? "Live" : "Draft"}
                  </button>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    style={{ ...labelStyle, fontSize: "0.57rem", color: "inherit", textDecoration: "none", opacity: 0.5 }}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="bg-transparent border-0 cursor-pointer p-1 opacity-30 hover:opacity-70 transition-opacity">
                    <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--burgundy)" }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
