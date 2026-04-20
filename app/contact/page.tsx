import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/contact-content";

export const metadata: Metadata = {
  title: "Contact — Let's Talk",
  description:
    "Share your theories, opinions, questions, or the topics you think deserve more attention. These conversations about psychology, trauma, crime, and human behavior need to happen.",
  openGraph: {
    title: "Let's Talk — Maria Agrafiotis",
    description:
      "Silence has never protected people. Share your theories, questions, and opinions about psychology, trauma, and human behavior.",
    url: "https://mariaagrafiotis.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://mariaagrafiotis.com/contact",
  },
};

export default function Page() {
  return <ContactContent />;
}
