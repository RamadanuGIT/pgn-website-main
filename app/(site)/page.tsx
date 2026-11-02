'use client';

import { ClientsPreview } from '@/components/home/clients-preview';
import {
  CoreServicesSection,
  CtaSection,
  ExperienceSection,
  HeroSection,
  IntroSection,
  WhyPgnSection,
} from '@/components/home/home-sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <CoreServicesSection />
      <WhyPgnSection />
      <ClientsPreview />
      <ExperienceSection />
      <CtaSection />
    </>
  );
}
