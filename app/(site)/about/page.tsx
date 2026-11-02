'use client';

import { HeartHandshake, ShieldCheck, Clock, UserRound, Target, Eye, History } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { SectionHeading } from '@/components/site/section-heading';
import { PAGE_IMAGES } from '@/lib/site-data';
import { CtaSection } from '@/components/home/home-sections';

const VALUE_ICONS = [ShieldCheck, Clock, HeartHandshake];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        image={PAGE_IMAGES.about}
        eyebrow={t.about.hero.eyebrow}
        title={t.about.hero.title}
        subtitle={t.about.hero.subtitle}
      />

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow={t.about.overview.eyebrow} title={t.about.overview.title} body={<p>{t.about.overview.body}</p>} />
          </Reveal>
          <Reveal>
            <dl className="grid gap-4 sm:grid-cols-2">
              {t.about.overview.facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{fact.label}</dt>
                  <dd className="mt-3 text-base font-bold text-navy-950">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-50/60 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="h-full">
              <article className="h-full rounded-2xl bg-white p-8 shadow-sm">
                <History className="h-8 w-8 text-gold-600" />
                <h2 className="mt-6 text-2xl font-bold text-navy-950">{t.about.history.title}</h2>
                <p className="mt-2 text-sm font-semibold text-gold-600">{t.about.history.eyebrow}</p>
                <p className="mt-5 text-sm leading-relaxed text-navy-700">{t.about.history.body}</p>
                <p className="mt-5 rounded-lg bg-navy-50 p-4 text-sm italic leading-relaxed text-navy-600">
                  {t.about.history.placeholder}
                </p>
              </article>
            </Reveal>
            <Reveal className="h-full">
              <article className="h-full rounded-2xl bg-white p-8 shadow-sm">
                <Eye className="h-8 w-8 text-gold-600" />
                <h2 className="mt-6 text-2xl font-bold text-navy-950">{t.about.vision.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-navy-700">{t.about.vision.body}</p>
              </article>
            </Reveal>
            <Reveal className="h-full">
              <article className="h-full rounded-2xl bg-white p-8 shadow-sm">
                <Target className="h-8 w-8 text-gold-600" />
                <h2 className="mt-6 text-2xl font-bold text-navy-950">{t.about.mission.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-navy-700">{t.about.mission.body}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.about.values.eyebrow} title={t.about.values.title} align="center" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {t.about.values.items.map((value, index) => {
              const Icon = VALUE_ICONS[index];
              return (
                <Reveal key={value.title} className="h-full">
                  <div className="group h-full rounded-2xl border border-navy-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-navy-950">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-700">{value.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading tone="dark" eyebrow={t.about.management.eyebrow} title={t.about.management.title} body={<p>{t.about.management.body}</p>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.management.roles.map((role) => (
              <Reveal key={role} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gold-300">
                    <UserRound className="h-8 w-8" />
                  </span>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-gold-300">{role}</p>
                  <p className="mt-2 text-base text-white/70">{t.about.management.namePlaceholder}</p>
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
