"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./language-provider";
import { LanguageSwitch } from "./language-switch";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/clients", key: "clients" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="PGN home"
        >
          <span className="flex h-12 w-14 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/pgn-website-main/logo-pgn.png"
              alt="Logo PT Purbaya Garda Nusantara"
              width={56}
              height={48}
              className="h-12 w-14 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-wide text-white">
              PGN
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 sm:block">
              Purbaya Garda Nusantara
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-semibold transition-colors duration-200 hover:text-gold-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-gold-400 after:transition-transform after:duration-300 ${
                  active
                    ? "text-gold-300 after:scale-x-100"
                    : "text-white after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-md xl:inline-flex"
          >
            {t.common.requestQuotation}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-navy-950 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[80vh] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4 sm:px-6">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-gold-300"
                    : "text-white/90 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <LanguageSwitch />
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300"
            >
              {t.common.requestQuotation}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
