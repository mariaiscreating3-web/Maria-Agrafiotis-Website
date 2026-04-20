export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  published: boolean;
  featured: boolean;
}

export const CATEGORIES = [
  { slug: "core-theories", label: "Core Theories" },
  { slug: "psychology-of-crime", label: "Psychology of Crime" },
  { slug: "victims-and-healing", label: 'Victims & "Healing"' },
  { slug: "questions-nobody-wants-to-ask", label: "Questions Nobody Wants to Ask" },
  { slug: "internet-takes", label: "Internet Takes" },
];
