import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/home-content";
import { getFeaturedPost, getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Maria Agrafiotis",
  description:
    "Exploring psychology, trauma, crime, and human behavior. Understanding the warning signs, childhood experiences, and deeper reasons behind why people do the things they do.",
  openGraph: {
    title: "Maria Agrafiotis",
    description:
      "Exploring psychology, trauma, crime, and human behavior. Understanding the deeper reasons behind why people do the things they do.",
    url: "https://mariaagrafiotis.com",
    type: "website",
  },
  alternates: {
    canonical: "https://mariaagrafiotis.com",
  },
};

export default async function Page() {
  let featuredPost = undefined;
  let recentPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    featuredPost = await getFeaturedPost();
    recentPosts = (await getPublishedPosts()).slice(0, 4);
  } catch { /* DB not available — render empty state */ }

  return <HomeContent featuredPost={featuredPost} recentPosts={recentPosts} />;
}
