"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";

export function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* silent — still show thank you */ }
    setSending(false);
    setSubmitted(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-16">
        <p className="label-caps text-muted-foreground mb-4" style={{ fontFamily: "var(--font-raleway)" }}>
          {c.label}
        </p>
        <h1 className="leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          {c.title}
        </h1>
        <div className="w-16 border-t-2 mb-8" style={{ borderColor: "var(--burgundy)" }} />
      </div>

      <div className="grid md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <p className="mb-6" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", lineHeight: "1.85" }}>
            {c.openingQuote}
          </p>
          <div className="space-y-4 text-muted-foreground leading-loose" style={{ fontSize: "0.9rem" }}>
            <p>{c.para1}</p>
            <p>{c.para2}</p>
            <p>{c.para3}</p>
          </div>
          <Separator className="my-10" />
          <div className="space-y-4">
            {c.reachOutItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--burgundy)" }} />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="border-l-2 pl-8 py-4" style={{ borderColor: "var(--burgundy)" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 400, lineHeight: "1.6" }}>
                {c.thankYouTitle}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-loose">{c.thankYouBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
                    {c.name}
                  </Label>
                  <Input id="name" name="name" required className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:border-b-2 px-0 transition-all" style={{ borderColor: "var(--border)" }} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
                    {c.email}
                  </Label>
                  <Input id="email" name="email" type="email" required className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:border-b-2 px-0 transition-all" style={{ borderColor: "var(--border)" }} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
                  {c.subject}
                </Label>
                <Input id="subject" name="subject" required className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:border-b-2 px-0 transition-all" style={{ borderColor: "var(--border)" }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="label-caps text-muted-foreground" style={{ fontFamily: "var(--font-raleway)" }}>
                  {c.message}
                </Label>
                <Textarea id="message" name="message" required rows={8} placeholder={c.messagePlaceholder} className="rounded-none border-0 border-b bg-transparent focus-visible:ring-0 focus-visible:border-b-2 px-0 resize-none transition-all" style={{ borderColor: "var(--border)" }} />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="label-caps px-10 py-3 border transition-all ContactBtn"
                style={{ fontFamily: "var(--font-raleway)", borderColor: "var(--burgundy)", color: "var(--burgundy)", background: "transparent", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.6 : 1 }}
              >
                {sending ? "Sending…" : c.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
