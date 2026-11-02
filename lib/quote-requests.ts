export const QUOTE_STATUSES = ['new', 'in_progress', 'done'] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new: 'Baru',
  in_progress: 'Diproses',
  done: 'Selesai',
};

export const QUOTE_STATUS_STYLES: Record<QuoteStatus, string> = {
  new: 'bg-amber-100 text-amber-900 ring-amber-300',
  in_progress: 'bg-sky-100 text-sky-900 ring-sky-300',
  done: 'bg-emerald-100 text-emerald-900 ring-emerald-300',
};

export type QuoteRequest = {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  locale: 'id' | 'en';
  status: QuoteStatus;
};
