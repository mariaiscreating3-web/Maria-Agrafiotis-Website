import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";

const siteUrl = "https://mariaagrafiotis.com";

const categorySlugs = [
  "core-theories",
  "victims-and-healing",
  "questions-nobody-wants-to-ask",
  "psychology-of-crime",
  "internet-takes",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${siteUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    postPages = posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch {
    // database not yet set up — sitemap still works for static pages
  }

  return [...staticPages, ...categoryPages, ...postPages];
}
