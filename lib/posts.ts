import { sql } from "./db";
export type { Post } from "./post-types";
export { CATEGORIES } from "./post-types";
import type { Post } from "./post-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToPost(row: any): Post {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    category: String(row.category),
    excerpt: String(row.excerpt),
    content: String(row.content),
    date: String(row.date),
    published: Boolean(row.published),
    featured: Boolean(row.featured),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const rows = await sql`SELECT * FROM posts ORDER BY date DESC`;
  return rows.map(rowToPost);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const rows = await sql`SELECT * FROM posts WHERE id = ${id}`;
  return rows[0] ? rowToPost(rows[0]) : undefined;
}

export async function createPost(data: Omit<Post, "id">): Promise<Post> {
  const id = Date.now().toString();
  const rows = await sql`
    INSERT INTO posts (id, title, slug, category, excerpt, content, date, published, featured)
    VALUES (${id}, ${data.title}, ${data.slug}, ${data.category}, ${data.excerpt}, ${data.content}, ${data.date}, ${data.published}, ${data.featured})
    RETURNING *
  `;
  return rowToPost(rows[0]);
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post | null> {
  const current = await getPostById(id);
  if (!current) return null;
  const u = { ...current, ...data };
  const rows = await sql`
    UPDATE posts
    SET title = ${u.title}, slug = ${u.slug}, category = ${u.category},
        excerpt = ${u.excerpt}, content = ${u.content}, date = ${u.date},
        published = ${u.published}, featured = ${u.featured}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function deletePost(id: string): Promise<boolean> {
  const existing = await getPostById(id);
  if (!existing) return false;
  await sql`DELETE FROM posts WHERE id = ${id}`;
  return true;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const rows = await sql`SELECT * FROM posts WHERE published = TRUE ORDER BY date DESC`;
  return rows.map(rowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} AND published = TRUE`;
  return rows[0] ? rowToPost(rows[0]) : undefined;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const rows = await sql`SELECT * FROM posts WHERE category = ${category} AND published = TRUE ORDER BY date DESC`;
  return rows.map(rowToPost);
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const rows = await sql`SELECT * FROM posts WHERE featured = TRUE AND published = TRUE ORDER BY date DESC LIMIT 1`;
  return rows[0] ? rowToPost(rows[0]) : undefined;
}
