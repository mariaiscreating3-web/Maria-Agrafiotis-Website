"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";

export function ResourcesContent() {
  const { t } = useLanguage();
  const r = t.resources;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-16">
        <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
          {r.label}
        </p>
        <h1 className="leading-tight" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          {r.title}
        </h1>
        <div className="w-16 border-t-2 mt-6" style={{ borderColor: "var(--burgundy)" }} />
      </div>
      <Separator />
      <div className="py-20 text-center">
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--muted-foreground)" }}>
          {r.comingSoon}
        </p>
        <p className="label-caps text-muted-foreground mt-3" style={{ fontFamily: "var(--font-raleway)" }}>
          {r.description}
        </p>
      </div>
    </div>
  );
}
