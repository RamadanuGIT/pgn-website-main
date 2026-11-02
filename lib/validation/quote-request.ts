import { z } from 'zod';
import type { Messages } from '@/lib/i18n/id';

export function buildQuoteSchema(v: Messages['contact']['validation']) {
  return z.object({
    companyName: z.string().trim().min(2, v.companyName).max(150),
    contactName: z.string().trim().min(2, v.contactName).max(120),
    email: z.string().trim().email(v.email).max(254),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9\s()-]{6,30}$/, v.phone),
    serviceType: z.string().min(1, v.serviceType).max(80),
    message: z.string().trim().min(10, v.message).max(3000),
  });
}

export type QuoteFormValues = z.infer<ReturnType<typeof buildQuoteSchema>>;
