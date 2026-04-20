"use client";

import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300 }}>
          Maria Agrafiotis
        </p>
        <p className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
          {t.footer.subtitle}
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maria Agrafiotis
        </p>
      </div>
    </footer>
  );
}
