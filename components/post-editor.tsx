"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, type Post } from "@/lib/post-types";

type PostForm = Omit<Post, "id">;

interface PostEditorProps {
  initial?: Partial<PostForm>;
  postId?: string;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function PostEditor({ initial, postId }: PostEditorProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const [form, setForm] = useState<PostForm>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    date: initial?.date ?? new Date().toISOString().split("T")[0],
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [slugEdited, setSlugEdited] = useState(isEdit);

  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugEdited]);

  function set<K extends keyof PostForm>(key: K, value: PostForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(publish?: boolean) {
    setSaving(true);
    const body: Partial<PostForm> = { ...form };
    if (publish !== undefined) body.published = publish;
    try {
      if (isEdit) {
        await fetch(`/api/posts/${postId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } else {
        await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      }
      router.push("/admin/posts");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = {
    fontFamily: "var(--font-raleway)",
    fontSize: "0.6rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    opacity: 0.55,
    display: "block",
    marginBottom: "0.4rem",
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    padding: "0.4rem 0",
    fontSize: "0.9rem",
    fontFamily: "var(--font-inter)",
    color: "var(--foreground)",
    outline: "none",
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.4rem" }}>
            {isEdit ? "Edit Post" : "New Post"}
          </p>
          <h1 className="truncate" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 300, lineHeight: 1 }}>
            {form.title || (isEdit ? "Edit Post" : "New Post")}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-1">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-3 sm:px-4 py-2 border bg-transparent cursor-pointer transition-all"
            style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", borderColor: "var(--border)", opacity: saving ? 0.4 : 0.6 }}
          >
            Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 sm:px-5 py-2 cursor-pointer transition-all"
            style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "var(--burgundy)", color: "var(--background)", border: "1px solid var(--burgundy)", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {/* Layout: stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Editor — full width on mobile, 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title…"
              style={{ ...inputStyle, fontSize: "1.4rem", fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="A short summary shown in listings…"
              rows={2}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex gap-0 border-b border-border mb-3">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-4 py-1.5 bg-transparent border-0 cursor-pointer"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", borderBottom: tab === t ? "2px solid var(--burgundy)" : "2px solid transparent", color: tab === t ? "var(--burgundy)" : "inherit", opacity: tab === t ? 1 : 0.45, marginBottom: "-1px" }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "write" ? (
              <textarea
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={"Write in Markdown…\n\n# Heading\n**Bold**, *italic*\n\nStart writing your article here."}
                rows={22}
                style={{ ...inputStyle, borderBottom: "none", border: "1px solid var(--border)", padding: "1rem", resize: "vertical", lineHeight: 1.8, fontSize: "0.88rem" }}
              />
            ) : (
              <div className="border border-border p-4 min-h-[22rem]" style={{ lineHeight: 1.8, fontSize: "0.9rem" }}>
                {form.content ? (
                  <div style={{ fontFamily: "var(--font-inter)", whiteSpace: "pre-wrap" }}>{form.content}</div>
                ) : (
                  <p style={{ opacity: 0.35, fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>Nothing to preview yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Metadata sidebar — below editor on mobile, right column on desktop */}
        <div className="lg:col-span-1 space-y-5">
          {/* Status */}
          <div className="border border-border p-4 space-y-3">
            <p style={{ ...labelStyle, marginBottom: 0 }}>Status</p>
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} style={{ accentColor: "var(--burgundy)", width: "14px", height: "14px" }} />
                <span style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Published</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} style={{ accentColor: "var(--burgundy)", width: "14px", height: "14px" }} />
                <span style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Featured</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231C1C1C' opacity='.4'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 4px center", paddingRight: "1.5rem" }}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={{ ...inputStyle }} />
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>Slug</label>
            <input
              value={form.slug}
              onChange={(e) => { setSlugEdited(true); set("slug", e.target.value); }}
              placeholder="url-friendly-slug"
              style={{ ...inputStyle, fontSize: "0.8rem", opacity: 0.7 }}
            />
          </div>

          {/* Save draft button (visible on mobile below metadata) */}
          <div className="lg:hidden pt-2 flex gap-2">
            <button onClick={() => handleSave(false)} disabled={saving} className="flex-1 py-3 border bg-transparent cursor-pointer" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", borderColor: "var(--border)", opacity: saving ? 0.4 : 0.7 }}>
              Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="flex-1 py-3 cursor-pointer" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", background: "var(--burgundy)", color: "var(--background)", border: "1px solid var(--burgundy)", opacity: saving ? 0.6 : 1 }}>
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
