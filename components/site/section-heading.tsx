import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export function SectionHeading({ eyebrow, title, body, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div className={`max-w-3xl space-y-4 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>
      <h2
        className={`text-3xl font-bold leading-[1.2] sm:text-4xl ${isDark ? 'text-white' : 'text-navy-950'}`}
      >
        {title}
      </h2>
      {body ? (
        <div className={`text-base leading-relaxed ${isDark ? 'text-white/75' : 'text-navy-700'}`}>{body}</div>
      ) : null}
    </div>
  );
}
