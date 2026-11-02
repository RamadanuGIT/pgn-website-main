'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { PAGE_IMAGES, buildWhatsAppUrl } from '@/lib/site-data';
import { QuoteForm } from '@/components/contact/quote-form';

export default function ContactPage() {
  const { t } = useLanguage();

  const infoItems = [
    { icon: MapPin, label: t.contact.info.address, value: t.contact.info.addressValue },
    { icon: Phone, label: t.contact.info.whatsapp, value: t.contact.info.whatsappValue },
    { icon: Mail, label: t.contact.info.email, value: t.contact.info.emailValue },
  ];

  return (
    <>
      <PageHero
        image={PAGE_IMAGES.contact}
        eyebrow={t.contact.hero.eyebrow}
        title={t.contact.hero.title}
        subtitle={t.contact.hero.subtitle}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
          <Reveal className="lg:col-span-2">
            <div className="space-y-5">
              {infoItems.map((item) => (
                <div key={item.label} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-gold-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{item.label}</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-navy-900">{item.value}</p>
                  </div>
                </div>
              ))}

              <a
                href={buildWhatsAppUrl(t.common.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                {t.contact.info.chatCta}
              </a>

              <div className="overflow-hidden rounded-2xl border border-navy-100">
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-navy-50 p-8 text-center">
                  <MapPin className="h-8 w-8 text-gold-600" />
                  <p className="text-sm font-semibold text-navy-950">{t.contact.info.mapTitle}</p>
                  <p className="text-sm leading-relaxed text-navy-700">{t.contact.info.mapPlaceholder}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-xl sm:p-10">
              <h2 className="text-2xl font-bold text-navy-950">{t.contact.form.title}</h2>
              <p className="mt-2 text-sm text-navy-700">{t.contact.form.body}</p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
