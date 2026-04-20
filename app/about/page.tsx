import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "I created this website because I do not believe that the most devastating crimes in society are inevitable. Learn about the research, focus areas, and motivations behind this work on psychology, trauma, and human behavior.",
  openGraph: {
    title: "About — Maria Agrafiotis",
    description:
      "I do not believe that the most devastating crimes in society are inevitable. Exploring childhood, parenting, trauma, and the deeper roots of human behavior.",
    url: "https://mariaagrafiotis.com/about",
    type: "profile",
  },
  alternates: {
    canonical: "https://mariaagrafiotis.com/about",
  },
};

export default function Page() {
  return <AboutContent />;
}
