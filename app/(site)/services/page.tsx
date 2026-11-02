'use client';

import { Check } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { SERVICE_IMAGES, SERVICE_KEYS, PAGE_IMAGES } from '@/lib/site-data';
import { CtaSection } from '@/components/home/home-sections';
import { SERVICE_ICONS } from '@/components/services/service-card';

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        image={PAGE_IMAGES.services}
        eyebrow={t.services.hero.eyebrow}
        title={t.services.hero.title}
        subtitle={t.services.hero.subtitle}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
          {SERVICE_KEYS.map((key, index) => {
            const item = t.services.items[key];
            const Icon = SERVICE_ICONS[key];
            const reversed = index % 2 === 1;
            return (
              <Reveal key={key}>
                <article
                  id={key}
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="group overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={SERVICE_IMAGES[key]}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h2 className="mt-6 text-3xl font-bold leading-[1.2] text-navy-950">{item.title}</h2>
                    <p className="mt-5 text-base leading-relaxed text-navy-700">{item.description}</p>
                    <ul className="mt-8 space-y-4">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm font-medium text-navy-900">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-50/60 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.services.hero.eyebrow} title={t.services.processTitle} align="center" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {t.services.process.map((step, index) => (
              <Reveal key={step.title} className="h-full">
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <span className="text-4xl font-bold text-gold-500">0{index + 1}</span>
                  <h3 className="mt-5 text-xl font-bold text-navy-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-700">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
