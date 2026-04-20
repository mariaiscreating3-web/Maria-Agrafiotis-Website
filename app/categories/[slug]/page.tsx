import type { Metadata } from "next";
import { CategoryContent } from "@/components/category-content";
import { getPostsByCategory } from "@/lib/posts";

export const dynamic = "force-dynamic";

const categoryMeta: Record<string, { title: string; description: string }> = {
  "core-theories": {
    title: "Core Theories",
    description:
      "Foundational psychological theories exploring trauma, behavior, and crime — from attachment theory to psychodynamics. Understanding why people become who they become.",
  },
  "victims-and-healing": {
    title: 'Victims & "Healing"',
    description:
      "Understanding the damage and trauma inflicted on victims of crime and abuse. Why we say treatment, not healing — and how to get victims the real help they need.",
  },
  "questions-nobody-wants-to-ask": {
    title: "Questions Nobody Wants to Ask",
    description:
      "The difficult conversations about human behavior, family dysfunction, and societal failure that people avoid — despite how necessary they are.",
  },
  "psychology-of-crime": {
    title: "Psychology of Crime",
    description:
      "Looking beyond headlines to ask the deeper questions: How did this happen? What led to it? Could it have been prevented? What happens to the people left behind?",
  },
  "internet-takes": {
    title: "Internet Takes",
    description:
      "Dissecting the social beliefs behind viral opinions and trending posts. Taking controversial statements about psychology, trauma, and human behavior and examining them critically.",
  },
};

const slugs = Object.keys(categoryMeta);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug];

  if (!meta) return { title: "Category" };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} — Maria Agrafiotis`,
      description: meta.description,
      url: `https://mariaagrafiotis.com/categories/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://mariaagrafiotis.com/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  const posts = await getPostsByCategory(slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mariaagrafiotis.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: "https://mariaagrafiotis.com/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta?.title ?? slug,
        item: `https://mariaagrafiotis.com/categories/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CategoryContent slug={slug} posts={posts} />
    </>
  );
}
