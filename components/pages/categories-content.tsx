"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";

const categorySlugs = [
  "core-theories",
  "victims-and-healing",
  "questions-nobody-wants-to-ask",
  "psychology-of-crime",
  "internet-takes",
] as const;

const numbers = ["01", "02", "03", "04", "05"];

export function CategoriesContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-16">
        <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
          {t.categories.browse}
        </p>
        <h1 className="leading-tight" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          {t.categories.title}
        </h1>
        <div className="w-16 border-t-2 mt-6" style={{ borderColor: "var(--burgundy)" }} />
      </div>

      <div className="space-y-0">
        {categorySlugs.map((slug, i) => {
          const cat = t.categories.items[slug];
          return (
            <div key={slug}>
              {i > 0 && <Separator />}
              <Link href={`/categories/${slug}`} className="group grid md:grid-cols-12 gap-8 py-12 transition-colors" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="md:col-span-1">
                  <span className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem" }}>
                    {numbers[i]}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h2 className="category-title leading-tight transition-colors" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "1.8rem" }}>
                    {cat.label}
                  </h2>
                  <div className="w-6 border-t mt-3 transition-all group-hover:w-12" style={{ borderColor: "var(--burgundy)" }} />
                </div>
                <div className="md:col-span-6">
                  <p className="text-muted-foreground leading-loose" style={{ fontSize: "0.9rem" }}>
                    {cat.description}
                  </p>
                </div>
                <div className="md:col-span-1 flex items-start justify-end pt-1">
                  <span className="label-caps opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-raleway)", color: "var(--burgundy)", fontSize: "0.6rem" }}>
                    →
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
