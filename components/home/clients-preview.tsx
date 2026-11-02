'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import type { ClientCategory } from '@/lib/i18n/id';

export function ClientsPreview() {
  const { t } = useLanguage();

  return (
    <section className="bg-navy-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t.home.clients.eyebrow} title={t.home.clients.title} body={<p>{t.home.clients.body}</p>} />
          <Link
            href="/clients"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-950 transition-colors hover:text-gold-600"
          >
            {t.common.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.clients.items.map((client, index) => (
            <Reveal key={client.name}>
              <div
                style={{ transitionDelay: `${index * 50}ms` }}
                className="flex h-full items-center gap-4 rounded-xl border border-navy-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-sm font-bold text-gold-300">
                  {client.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy-950">{client.name}</p>
                  <p className="mt-1 text-xs text-navy-700">
                    {t.clients.categories[client.category as ClientCategory]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
