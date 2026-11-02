'use client';

import { useLanguage } from '@/components/site/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import Link from 'next/link';
import { PAGE_IMAGES, buildWhatsAppUrl } from '@/lib/site-data';
import type { ClientCategory } from '@/lib/i18n/id';

export default function ClientsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        image={PAGE_IMAGES.clients}
        eyebrow={t.clients.hero.eyebrow}
        title={t.clients.hero.title}
        subtitle={t.clients.hero.subtitle}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-2xl border border-gold-200 bg-gold-50 p-6 sm:items-center">
            <p className="text-sm leading-relaxed text-navy-800">{t.clients.notice}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.clients.items.map((client, index) => (
              <Reveal key={client.name} className="h-full">
                <article
                  style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl"
                >
                  <div className="flex h-24 items-center justify-center rounded-xl bg-navy-50 transition-colors duration-300 group-hover:bg-navy-950">
                    <span className="text-3xl font-bold text-navy-900 transition-colors duration-300 group-hover:text-gold-300">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <span className="mt-6 inline-flex w-fit rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                    {t.clients.categories[client.category as ClientCategory]}
                  </span>
                  <h2 className="mt-4 text-lg font-bold leading-snug text-navy-950">{client.name}</h2>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="max-w-xl text-2xl font-bold leading-snug text-white sm:text-3xl">{t.clients.cta}</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
            >
              {t.clients.ctaButton}
            </Link>
            <a
              href={buildWhatsAppUrl(t.common.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-300"
            >
              {t.common.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
