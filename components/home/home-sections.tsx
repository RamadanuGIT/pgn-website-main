"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HeartHandshake,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { PAGE_IMAGES, SERVICE_KEYS } from "@/lib/site-data";
import { useLanguage } from "@/components/site/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/services/service-card";

const WHY_ICONS = [ShieldCheck, Clock, HeartHandshake, UserCheck];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy-950 pt-28 pb-20">
      <img
        src={PAGE_IMAGES.home}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/90 to-navy-900/70" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="animate-fade-up flex items-center gap-4">
            <span className="h-px w-12 bg-gold-400" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
              {t.home.hero.eyebrow}
            </p>
          </div>
          <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-[1.1] text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl">
            {t.home.hero.headline}
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [animation-delay:200ms]">
            {t.home.hero.subheadline}
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-4 [animation-delay:300ms] sm:flex-row">
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-lg shadow-gold-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
            >
              {t.home.hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-300"
            >
              {t.home.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src={PAGE_IMAGES.about}
              alt=""
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl sm:aspect-[5/4]"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-navy-950 px-6 py-5 text-white shadow-xl sm:block">
              <p className="text-3xl font-bold text-gold-300">2019</p>
              <p className="mt-1 text-sm text-white/75">
                {t.footer.established}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading
            eyebrow={t.home.intro.eyebrow}
            title={t.home.intro.title}
            body={<p>{t.home.intro.body}</p>}
          />
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-950 transition-colors hover:text-gold-600"
          >
            {t.home.intro.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function CoreServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-navy-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t.home.services.eyebrow}
            title={t.home.services.title}
            body={<p>{t.home.services.body}</p>}
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-950 transition-colors hover:text-gold-600"
          >
            {t.common.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, index) => (
            <ServiceCard key={key} serviceKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyPgnSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.home.why.eyebrow}
          title={t.home.why.title}
          align="center"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.home.why.items.map((item, index) => {
            const Icon = WHY_ICONS[index];
            return (
              <Reveal key={item.title} className="h-full">
                <div className="group h-full rounded-2xl border border-navy-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-700">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            tone="dark"
            eyebrow={t.home.experience.eyebrow}
            title={t.home.experience.title}
            body={<p>{t.home.experience.body}</p>}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {t.home.experience.stats.map((stat, index) => (
              <Reveal key={stat.label}>
                <div
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/50"
                >
                  <p className="text-4xl font-bold text-gold-300">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-300 p-10 shadow-xl sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-[1.2] text-navy-950 sm:text-4xl">
                {t.home.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-900/80">
                {t.home.cta.body}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-navy-950 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800"
              >
                {t.home.cta.primary}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-navy-950/30 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950"
              >
                {t.home.cta.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
