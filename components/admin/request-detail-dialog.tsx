'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getSupabase } from '@/lib/supabase/client';
import {
  QUOTE_STATUS_LABELS,
  QUOTE_STATUSES,
  type QuoteRequest,
  type QuoteStatus,
} from '@/lib/quote-requests';

type RequestDetailDialogProps = {
  request: QuoteRequest | null;
  onClose: () => void;
  onStatusChange: (id: string, status: QuoteStatus) => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-600">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-navy-950">{value}</dd>
    </div>
  );
}

export function RequestDetailDialog({ request, onClose, onStatusChange }: RequestDetailDialogProps) {
  const [status, setStatus] = useState<QuoteStatus>('new');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setSaveError(null);
    }
  }, [request]);

  const handleStatusSave = async (next: QuoteStatus) => {
    if (!request) return;
    setStatus(next);
    setSaving(true);
    setSaveError(null);
    const { error } = await getSupabase()
      .from('quote_requests')
      .update({ status: next })
      .eq('id', request.id);
    setSaving(false);
    if (error) {
      setStatus(request.status);
      setSaveError('Status belum dapat diperbarui. Silakan coba lagi.');
      return;
    }
    onStatusChange(request.id, next);
  };

  return (
    <Dialog open={request !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {request ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-navy-950">{request.company_name}</DialogTitle>
              <DialogDescription>Detail permintaan penawaran kerja sama.</DialogDescription>
            </DialogHeader>

            <dl className="grid gap-6 sm:grid-cols-2">
              <DetailRow label="Nama Kontak" value={request.contact_name} />
              <DetailRow label="Email" value={request.email} />
              <DetailRow label="Nomor Telepon" value={request.phone} />
              <DetailRow label="Jenis Layanan" value={request.service_type} />
              <div className="sm:col-span-2">
                <DetailRow label="Pesan" value={request.message} />
              </div>
            </dl>

            <div className="mt-6 space-y-3 rounded-xl bg-navy-50 p-5">
              <label htmlFor="request-status" className="text-sm font-semibold text-navy-900">
                Status Permintaan
              </label>
              <div className="flex items-center gap-3">
                <select
                  id="request-status"
                  value={status}
                  disabled={saving}
                  onChange={(event) => void handleStatusSave(event.target.value as QuoteStatus)}
                  className="w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-200/60 disabled:opacity-70 sm:w-60"
                >
                  {QUOTE_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {QUOTE_STATUS_LABELS[value]}
                    </option>
                  ))}
                </select>
                {saving ? <Loader2 className="h-4 w-4 animate-spin text-navy-700" /> : null}
              </div>
              {saveError ? (
                <p role="alert" className="text-sm font-medium text-red-700">
                  {saveError}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${request.email}`}
                className="inline-flex items-center justify-center rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Kirim Email
              </a>
              <a
                href={`tel:${request.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-navy-200 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-400"
              >
                Telepon
              </a>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
