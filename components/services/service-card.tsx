'use client';

import Link from 'next/link';
import { ArrowRight, Anchor, Building2, Factory, House, ShieldCheck, ShoppingBag } from 'lucide-react';
import { SERVICE_IMAGES, type ServiceKey } from '@/lib/site-data';
import { useLanguage } from '@/components/site/language-provider';
import { Reveal } from '@/components/site/reveal';

export const SERVICE_ICONS: Record<ServiceKey, typeof Factory> = {
  industrial: Factory,
  building: Building2,
  residential: House,
  mall: ShoppingBag,
  port: Anchor,
  personnel: ShieldCheck,
};

export function ServiceCard({ serviceKey, index }: { serviceKey: ServiceKey; index: number }) {
  const { t } = useLanguage();
  const item = t.services.items[serviceKey];
  const Icon = SERVICE_ICONS[serviceKey];

  return (
    <Reveal className="h-full" >
      <Link
        href="/services"
        style={{ transitionDelay: `${index * 60}ms` }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={SERVICE_IMAGES[serviceKey]}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950/90 text-gold-300">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-lg font-bold leading-snug text-navy-950">{item.title}</h3>
          <p className="flex-1 text-sm leading-relaxed text-navy-700">{item.description}</p>
          <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-gold-600 transition-all duration-300 group-hover:gap-3">
            {t.common.learnMore}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
