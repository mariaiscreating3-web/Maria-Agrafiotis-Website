import fs from "fs";
import path from "path";
export type { Post } from "./post-types";
export { CATEGORIES } from "./post-types";
import type { Post } from "./post-types";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

export function getAllPosts(): Post[] {
  try {
    const raw = fs.readFileSync(POSTS_FILE, "utf-8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]): void {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export function getPostById(id: string): Post | undefined {
  return getAllPosts().find((p) => p.id === id);
}

export function createPost(data: Omit<Post, "id">): Post {
  const posts = getAllPosts();
  const post: Post = { ...data, id: Date.now().toString() };
  savePosts([...posts, post]);
  return post;
}

export function updatePost(id: string, data: Partial<Post>): Post | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...posts[idx], ...data };
  posts[idx] = updated;
  savePosts(posts);
  return updated;
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}

export function getPublishedPosts(): Post[] {
  return getAllPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug && p.published);
}

export function getPostsByCategory(category: string): Post[] {
  return getPublishedPosts().filter((p) => p.category === category);
}

export function getFeaturedPost(): Post | undefined {
  return getPublishedPosts().find((p) => p.featured);
}

