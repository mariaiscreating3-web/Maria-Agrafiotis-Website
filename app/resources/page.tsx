import type { Metadata } from "next";
import { ResourcesContent } from "@/components/pages/resources-content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Books, research papers, and further reading on psychology, trauma, criminal behavior, and human development recommended by Maria Agrafiotis.",
  openGraph: {
    title: "Resources — Maria Agrafiotis",
    description:
      "Recommended books, research papers, and further reading on psychology, trauma, criminal behavior, and human development.",
    url: "https://mariaagrafiotis.com/resources",
    type: "website",
  },
  alternates: {
    canonical: "https://mariaagrafiotis.com/resources",
  },
};

export default function Page() {
  return <ResourcesContent />;
}
