'use client';

import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import type { GalleryPhoto } from '@/lib/site-data';

type GalleryLightboxProps = {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export function GalleryLightbox({ photos, index, onClose, onNavigate }: GalleryLightboxProps) {
  const { t } = useLanguage();
  const photo = photos[index];
  const count = photos.length;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % count);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + count) % count);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [index, count, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm animate-fade-up [animation-duration:0.4s]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.gallery.lightbox.close}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index - 1 + count) % count);
        }}
        aria-label={t.gallery.lightbox.previous}
        className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <figure className="max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img
          key={photo.id}
          src={photo.image}
          alt={t.gallery.captions[photo.id as keyof typeof t.gallery.captions]}
          className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl animate-fade-up [animation-duration:0.5s]"
        />
        <figcaption className="mt-5 flex flex-col items-center gap-1 text-center text-white">
          <span className="text-base font-semibold">
            {t.gallery.captions[photo.id as keyof typeof t.gallery.captions]}
          </span>
          <span className="text-sm text-white/60">
            {index + 1} {t.gallery.lightbox.counter} {count}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index + 1) % count);
        }}
        aria-label={t.gallery.lightbox.next}
        className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
