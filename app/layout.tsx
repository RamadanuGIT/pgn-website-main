import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PT Purbaya Garda Nusantara (PGN) | Security Services",
    template: "%s | PT Purbaya Garda Nusantara",
  },
  description:
    "PT Purbaya Garda Nusantara (PGN) menyediakan jasa pengamanan profesional untuk kawasan industri, gedung perkantoran, perumahan, pusat perbelanjaan, dan pelabuhan di Indonesia.",
  keywords: [
    "security services",
    "jasa pengamanan",
    "PGN",
    "Purbaya Garda Nusantara",
    "security Indonesia",
  ],
  openGraph: {
    title: "PT Purbaya Garda Nusantara (PGN) | Security Services",
    description: "Security you can trust, protection you can rely on.",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${font.variable} ${font.className}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
