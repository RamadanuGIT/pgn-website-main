'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/site-data';
import { useLanguage } from './language-provider';

export function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href={buildWhatsAppUrl(t.common.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsapp}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-emerald-600 py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
      <span className="hidden sm:inline">{t.common.whatsapp}</span>
    </a>
  );
}
