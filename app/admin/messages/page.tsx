"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  async function handleMarkRead(msg: Message) {
    if (msg.read) return;
    await fetch(`/api/messages/${msg.id}`, { method: "PATCH" });
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m));
    if (selected?.id === msg.id) setSelected({ ...msg, read: true });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function openMessage(msg: Message) {
    setSelected(msg);
    handleMarkRead(msg);
  }

  const unread = messages.filter((m) => !m.read).length;

  const labelStyle = {
    fontFamily: "var(--font-raleway)",
    fontSize: "0.6rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p style={{ ...labelStyle, opacity: 0.5, marginBottom: "0.4rem" }}>Admin</p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontWeight: 300, lineHeight: 1 }}>
          Messages
          {unread > 0 && (
            <span className="ml-3 inline-flex items-center justify-center" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.65rem", letterSpacing: "0.1em", background: "var(--burgundy)", color: "var(--background)", padding: "0.15rem 0.55rem", verticalAlign: "middle" }}>
              {unread} new
            </span>
          )}
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="border border-dashed border-border p-10 sm:p-12 text-center">
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", opacity: 0.5 }}>No messages yet</p>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0 border border-border">
          {/* Message list */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className="flex items-start gap-3 p-4 border-b border-border cursor-pointer transition-colors hover:bg-card/60"
                style={{ background: selected?.id === msg.id ? "var(--card)" : undefined }}
              >
                <div className="mt-0.5 shrink-0">
                  {msg.read
                    ? <MailOpen className="h-3.5 w-3.5 opacity-30" />
                    : <Mail className="h-3.5 w-3.5" style={{ color: "var(--burgundy)" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: msg.read ? 400 : 500 }}>
                    {msg.name}
                  </p>
                  <p className="truncate" style={{ ...labelStyle, fontSize: "0.55rem", opacity: 0.5 }}>
                    {msg.subject || "(no subject)"}
                  </p>
                  <p className="truncate text-sm mt-0.5 opacity-40" style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem" }}>
                    {msg.message}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                  className="bg-transparent border-0 cursor-pointer p-1 opacity-20 hover:opacity-60 transition-opacity shrink-0"
                >
                  <Trash2 className="h-3 w-3" style={{ color: "var(--burgundy)" }} />
                </button>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3 p-6">
            {selected ? (
              <div>
                <div className="mb-6 pb-5 border-b border-border">
                  <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, lineHeight: 1.3 }}>
                    {selected.subject || "(no subject)"}
                  </h2>
                  <div className="mt-3 space-y-1">
                    <p style={{ ...labelStyle, fontSize: "0.57rem", opacity: 0.55 }}>
                      From: <span style={{ fontWeight: 500 }}>{selected.name}</span>
                    </p>
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "")}`}
                      style={{ ...labelStyle, fontSize: "0.57rem", color: "var(--burgundy)", textDecoration: "none" }}
                    >
                      {selected.email} → Reply via email
                    </a>
                    <p style={{ ...labelStyle, fontSize: "0.52rem", opacity: 0.4 }}>
                      {new Date(selected.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: "0.92rem", lineHeight: 1.9, whiteSpace: "pre-wrap", opacity: 0.85 }}>
                  {selected.message}
                </div>
                <div className="mt-8 flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "")}`}
                    className="inline-flex items-center px-5 py-2.5 transition-all"
                    style={{ ...labelStyle, fontSize: "0.58rem", border: "1px solid var(--burgundy)", color: "var(--burgundy)", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--burgundy)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--background)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--burgundy)"; }}
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="px-5 py-2.5 bg-transparent border border-border cursor-pointer transition-all hover:opacity-70"
                    style={{ ...labelStyle, fontSize: "0.58rem" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center" style={{ minHeight: "200px" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", opacity: 0.35 }}>
                  Select a message to read
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
