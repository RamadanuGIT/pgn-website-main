'use client';

import { useCallback, useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { GALLERY_CATEGORY_KEYS, GALLERY_PHOTOS, PAGE_IMAGES, type GalleryCategoryKey } from '@/lib/site-data';
import { GalleryLightbox } from '@/components/gallery/gallery-lightbox';

type FilterKey = 'all' | GalleryCategoryKey;

export default function GalleryPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const photos = filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((photo) => photo.category === filter);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const filters: FilterKey[] = ['all', ...GALLERY_CATEGORY_KEYS];

  return (
    <>
      <PageHero
        image={PAGE_IMAGES.gallery}
        eyebrow={t.gallery.hero.eyebrow}
        title={t.gallery.hero.title}
        subtitle={t.gallery.hero.subtitle}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm leading-relaxed text-navy-800">
            {t.gallery.notice}
          </p>

          <div role="tablist" aria-label={t.gallery.hero.eyebrow} className="mt-10 flex gap-3 overflow-x-auto pb-2">
            {filters.map((key) => {
              const active = key === filter;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(key)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'border-navy-950 bg-navy-950 text-white shadow-md'
                      : 'border-navy-200 bg-white text-navy-800 hover:border-gold-400 hover:text-navy-950'
                  }`}
                >
                  {t.gallery.categories[key]}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <Reveal key={photo.id}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={t.gallery.captions[photo.id as keyof typeof t.gallery.captions]}
                  className="group relative block w-full overflow-hidden rounded-2xl text-left shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-300"
                >
                  <img
                    src={photo.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <span className="text-sm font-semibold leading-snug text-white">
                      {t.gallery.captions[photo.id as keyof typeof t.gallery.captions]}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950 transition-transform duration-300 group-hover:scale-110">
                      <ZoomIn className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null ? (
        <GalleryLightbox
          photos={photos}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  );
}
