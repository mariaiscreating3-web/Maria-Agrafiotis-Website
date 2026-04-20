"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";

export function AboutContent() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-16">
        <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
          {a.label}
        </p>
        <h1 className="leading-tight" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          Maria
          <br />
          Agrafiotis
        </h1>
        <div className="w-16 border-t-2 mt-6" style={{ borderColor: "var(--burgundy)" }} />
      </div>

      <div className="grid md:grid-cols-12 gap-16 mb-20">
        <div className="md:col-span-7 space-y-5 leading-loose text-muted-foreground" style={{ fontSize: "0.95rem" }}>
          <p>{a.para1}</p>
          <p>{a.para2}</p>
          <p>{a.para3}</p>
          <p>{a.para4}</p>
          <p>{a.para5}</p>
        </div>
        <div className="md:col-span-5">
          <div className="border-l-2 pl-8 py-4 mb-8" style={{ borderColor: "var(--burgundy)" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", lineHeight: "1.85" }}>
              &ldquo;{a.pullQuote}&rdquo;
            </p>
          </div>
          <p className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
            {a.areasOfFocus}
          </p>
          <div className="mt-4 space-y-2">
            {a.focusItems.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2 border-b border-border">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--burgundy)" }} />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="py-16 text-center">
        <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
          {a.wantToTalk}
        </p>
        <h2 className="mb-8" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "2.5rem" }}>
          {a.theseConversations}
        </h2>
        <Link href="/contact" className="inline-block label-caps px-10 py-3 border transition-all ContactBtn" style={{ fontFamily: "var(--font-raleway)", borderColor: "var(--burgundy)", color: "var(--burgundy)" }}>
          {a.getInTouch}
        </Link>
      </div>
    </div>
  );
}
