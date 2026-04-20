"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, PlusCircle, Eye, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "All Posts", icon: FileText, exact: false },
  { href: "/admin/posts/new", label: "New Post", icon: PlusCircle, exact: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.02em" }}>
            Maria Agrafiotis
          </p>
          <p className="mt-0.5" style={{ fontFamily: "var(--font-raleway)", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.55 }}>
            Dashboard
          </p>
        </div>
        <button
          className="md:hidden p-1 opacity-50 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 py-4 px-3">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== "/admin";
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 mb-0.5 transition-all text-sm",
                active
                  ? "border-l-2 bg-background"
                  : "border-l-2 border-transparent opacity-60 hover:opacity-100 hover:bg-background/60"
              )}
              style={{
                borderLeftColor: active ? "var(--burgundy)" : "transparent",
                fontFamily: "var(--font-raleway)",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: active ? "var(--burgundy)" : "inherit",
              }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 opacity-50 hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-raleway)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
        >
          <Eye className="h-3 w-3 shrink-0" />
          View Site
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F0E8" }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 border-r border-border flex-col" style={{ background: "#EFEAD9" }}>
        <NavContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex flex-col border-r border-border" style={{ background: "#EFEAD9" }}>
            <NavContent />
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border" style={{ background: "#EFEAD9" }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 bg-transparent border-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          >
            <Menu className="h-4 w-4" />
          </button>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 300 }}>
            Dashboard
          </p>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
