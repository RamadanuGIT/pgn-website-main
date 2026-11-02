import type { ReactNode } from "react";

type PageHeroProps = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 sm:pt-44 sm:pb-28">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
          {eyebrow}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl font-bold leading-[1.15] text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/75 [animation-delay:160ms]">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
