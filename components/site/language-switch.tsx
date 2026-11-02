'use client';

import { useLanguage, type Lang } from './language-provider';

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'id', label: 'ID' },
  { value: 'en', label: 'EN' },
];

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.header.language}
      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 p-1 text-xs font-semibold tracking-wide"
    >
      {OPTIONS.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 transition-colors duration-200 ${
              active
                ? 'bg-gold-400 text-navy-950'
                : 'text-white/75 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
