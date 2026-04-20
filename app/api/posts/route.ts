import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const post = createPost({
    title: body.title ?? "",
    slug: body.slug ?? "",
    category: body.category ?? "",
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    date: body.date ?? new Date().toISOString().split("T")[0],
    published: body.published ?? false,
    featured: body.featured ?? false,
  });
  return NextResponse.json(post, { status: 201 });
}
