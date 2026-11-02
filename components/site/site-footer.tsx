'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useLanguage } from './language-provider';

const FOOTER_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/clients', key: 'clients' },
  { href: '/gallery', key: 'gallery' },
  { href: '/contact', key: 'contact' },
] as const;

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-400 text-navy-950">
              <Shield className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-bold tracking-wide text-white">PT Purbaya Garda Nusantara</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{t.footer.description}</p>
          <p className="text-sm font-semibold text-gold-300">{t.footer.established}</p>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            {t.footer.navigation}
          </h3>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold-300">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            {t.footer.contact}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>{t.contact.info.addressValue}</li>
            <li>{t.contact.info.whatsappValue}</li>
            <li>{t.contact.info.emailValue}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {year} PT Purbaya Garda Nusantara. {t.footer.rights}
          </p>
          <Link href="/admin" className="transition-colors hover:text-gold-300">
            {t.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
