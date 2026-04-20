"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import type { LangCode } from "@/lib/translations";

const languages: { code: LangCode; label: string }[] = [
  { code: "EN", label: "English" },
  { code: "EL", label: "Ελληνικά" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
];

const categorySlugs = [
  "core-theories",
  "victims-and-healing",
  "questions-nobody-wants-to-ask",
  "psychology-of-crime",
  "internet-takes",
] as const;

export function Navigation() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const catsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCats = () => { if (catsTimeout.current) clearTimeout(catsTimeout.current); setCatsOpen(true); };
  const closeCats = () => { catsTimeout.current = setTimeout(() => setCatsOpen(false), 120); };
  const openLang = () => { if (langTimeout.current) clearTimeout(langTimeout.current); setLangOpen(true); };
  const closeLang = () => { langTimeout.current = setTimeout(() => setLangOpen(false), 120); };

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/resources", label: t.nav.resources },
  ];

  const navLinkStyle = (href: string) => ({
    fontFamily: "var(--font-raleway)",
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: pathname === href ? "var(--burgundy)" : "var(--foreground)",
    textDecoration: "none",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">

        {/* LEFT: Name + Subtitle */}
        <div className="flex flex-col gap-1 shrink-0">
          <Link
            href="/"
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.55rem",
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "inherit",
              textDecoration: "none",
              lineHeight: 1.1,
            }}
          >
            Maria Agrafiotis
          </Link>
          <p
            style={{
              fontFamily: "var(--font-raleway)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#1C1C1C",
              fontWeight: 800,
              opacity: 1,
              lineHeight: 1,
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* RIGHT: Nav links + Language selector — desktop */}
        <div className="hidden md:flex items-center gap-6">

          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity"
              style={navLinkStyle(item.href)}
            >
              {item.label}
            </Link>
          ))}

          {/* Categories dropdown */}
          <div className="relative" onMouseEnter={openCats} onMouseLeave={closeCats}>
            <button
              className="flex items-center gap-1.5 bg-transparent border-0 cursor-pointer hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "var(--font-raleway)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: pathname?.startsWith("/categories") || catsOpen ? "var(--burgundy)" : "var(--foreground)",
                padding: 0,
              }}
              onClick={() => setCatsOpen(!catsOpen)}
            >
              {t.nav.categories}
              <ChevronDown className={cn("h-2.5 w-2.5 transition-transform", catsOpen && "rotate-180")} />
            </button>

            {catsOpen && (
              <div
                className="absolute top-full right-0 mt-3 border border-border bg-background shadow-sm z-50"
                onMouseEnter={openCats}
                onMouseLeave={closeCats}
              >
                <ul className="py-2 min-w-[240px]">
                  {categorySlugs.map((slug) => {
                    const cat = t.categories.items[slug];
                    return (
                      <li key={slug}>
                        <Link
                          href={`/categories/${slug}`}
                          onClick={() => setCatsOpen(false)}
                          className="block px-5 py-2.5 border-l-2 border-transparent transition-all hover:bg-card"
                          style={{ textDecoration: "none", color: "inherit" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "var(--burgundy)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "transparent"; }}
                        >
                          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500 }}>
                            {cat.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="px-5 py-3 border-t border-border">
                  <Link
                    href="/categories"
                    onClick={() => setCatsOpen(false)}
                    className="hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-raleway)", color: "var(--burgundy)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none" }}
                  >
                    {t.nav.viewAllCategories}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navItems.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity"
              style={navLinkStyle(item.href)}
            >
              {item.label}
            </Link>
          ))}

          {/* Language selector */}
          <div className="relative border-l border-border pl-6" onMouseEnter={openLang} onMouseLeave={closeLang}>
            <button
              className="flex items-center gap-1 bg-transparent border-0 cursor-pointer hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--foreground)", padding: 0 }}
              onClick={() => setLangOpen(!langOpen)}
            >
              {lang}
              <ChevronDown className={cn("h-2.5 w-2.5 transition-transform", langOpen && "rotate-180")} />
            </button>

            {langOpen && (
              <div
                className="absolute top-full right-0 mt-3 border border-border bg-background shadow-sm z-50 min-w-[155px]"
                onMouseEnter={openLang}
                onMouseLeave={closeLang}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-card transition-colors border-0 bg-transparent cursor-pointer"
                    style={{ color: lang === l.code ? "var(--burgundy)" : "inherit" }}
                  >
                    <span style={{ fontFamily: "var(--font-raleway)", letterSpacing: "0.25em", fontSize: "0.6rem", textTransform: "uppercase" }}>
                      {l.code}
                    </span>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.72rem", letterSpacing: "0.05em" }}>
                      {l.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden p-2 hover:opacity-70 transition-opacity">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background border-border">
            <div className="flex flex-col mt-8">

              {/* Language selector — mobile */}
              <div className="py-3 px-2 border-b border-border flex items-center gap-3 flex-wrap">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="bg-transparent border-0 cursor-pointer"
                    style={{
                      fontFamily: "var(--font-raleway)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: lang === l.code ? "var(--burgundy)" : "var(--muted-foreground)",
                      fontWeight: lang === l.code ? 400 : 200,
                    }}
                  >
                    {l.code}
                  </button>
                ))}
              </div>

              {navItems.slice(0, 2).map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="py-4 px-2 border-b border-border hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: pathname === item.href ? "var(--burgundy)" : "var(--foreground)", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-b border-border">
                <button
                  className="w-full text-left py-4 px-2 flex items-center justify-between hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--foreground)" }}
                  onClick={() => setMobileCatsOpen(!mobileCatsOpen)}
                >
                  {t.nav.categories}
                  <ChevronDown className={cn("h-3 w-3 transition-transform", mobileCatsOpen && "rotate-180")} />
                </button>
                {mobileCatsOpen && (
                  <div className="pb-2 pl-4">
                    {categorySlugs.map((slug) => (
                      <Link key={slug} href={`/categories/${slug}`} onClick={() => setMobileOpen(false)}
                        className="block py-2 hover:opacity-70 transition-opacity"
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", textDecoration: "none", color: "var(--foreground)" }}
                      >
                        {t.categories.items[slug].label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(2).map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="py-4 px-2 border-b border-border hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-raleway)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: pathname === item.href ? "var(--burgundy)" : "var(--foreground)", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}
