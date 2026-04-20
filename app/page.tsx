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

export default function Page() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getPublishedPosts().slice(0, 4);

  return <HomeContent featuredPost={featuredPost} recentPosts={recentPosts} />;
}
