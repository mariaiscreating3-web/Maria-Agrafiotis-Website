import type { Metadata } from "next";
import { CategoriesContent } from "@/components/pages/categories-content";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse all categories: Core Theories, Psychology of Crime, Victims & Healing, Questions Nobody Wants to Ask, and Internet Takes. Exploring the deeper dimensions of human behavior and trauma.",
  openGraph: {
    title: "Categories — Maria Agrafiotis",
    description:
      "Explore core psychological theories, criminal psychology, trauma, difficult questions, and the social beliefs behind internet trends.",
    url: "https://mariaagrafiotis.com/categories",
    type: "website",
  },
  alternates: {
    canonical: "https://mariaagrafiotis.com/categories",
  },
};

export default function Page() {
  return <CategoriesContent />;
}
