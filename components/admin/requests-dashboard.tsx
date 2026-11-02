'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { getSupabase } from '@/lib/supabase/client';
import {
  QUOTE_STATUS_LABELS,
  QUOTE_STATUS_STYLES,
  QUOTE_STATUSES,
  type QuoteRequest,
  type QuoteStatus,
} from '@/lib/quote-requests';
import { RequestDetailDialog } from '@/components/admin/request-detail-dialog';

type FilterValue = 'all' | QuoteStatus;
type LoadState = 'loading' | 'ready' | 'error';

const FILTERS: FilterValue[] = ['all', ...QUOTE_STATUSES];

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function RequestsDashboard() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setLoadState('loading');
    const { data, error } = await getSupabase()
      .from('quote_requests')
      .select('id, created_at, company_name, contact_name, email, phone, service_type, message, locale, status')
      .order('created_at', { ascending: false });

    if (error || !Array.isArray(data)) {
      setLoadState('error');
      return;
    }
    setRequests(data as QuoteRequest[]);
    setLoadState('ready');
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  const handleStatusChange = (id: string, status: QuoteStatus) => {
    setRequests((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const visible = filter === 'all' ? requests : requests.filter((item) => item.status === filter);
  const selected = requests.find((item) => item.id === selectedId) ?? null;

  const countFor = (value: FilterValue) =>
    value === 'all' ? requests.length : requests.filter((item) => item.status === value).length;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Permintaan Penawaran</h1>
          <p className="mt-1 text-sm text-navy-700">Permintaan kerja sama yang masuk dari formulir website.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadRequests()}
          className="inline-flex items-center gap-2 self-start rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-gold-400 sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loadState === 'loading' ? 'animate-spin' : ''}`} />
          Muat Ulang
        </button>
      </div>

      <div role="tablist" className="flex flex-wrap gap-2">
        {FILTERS.map((value) => {
          const active = value === filter;
          const label = value === 'all' ? 'Semua' : QUOTE_STATUS_LABELS[value];
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? 'bg-navy-950 text-white' : 'bg-white text-navy-800 ring-1 ring-navy-200 hover:ring-gold-400'
              }`}
            >
              {label} <span className="ml-1 opacity-70">({countFor(value)})</span>
            </button>
          );
        })}
      </div>

      {loadState === 'error' ? (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-800">Permintaan belum dapat dimuat. Silakan coba muat ulang.</p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        {loadState === 'loading' && requests.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-navy-700">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <div className="py-20 text-center text-sm text-navy-700">Belum ada permintaan pada kategori ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-navy-100 text-left text-sm">
              <thead className="bg-navy-50 text-xs font-semibold uppercase tracking-[0.12em] text-navy-700">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Perusahaan</th>
                  <th className="px-6 py-4">Kontak</th>
                  <th className="px-6 py-4">Layanan</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {visible.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="cursor-pointer transition-colors hover:bg-gold-50/60"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-navy-700">
                      {dateFormatter.format(new Date(item.created_at))}
                    </td>
                    <td className="px-6 py-4 font-semibold text-navy-950">{item.company_name}</td>
                    <td className="px-6 py-4 text-navy-800">
                      <p>{item.contact_name}</p>
                      <p className="text-xs text-navy-600">{item.email}</p>
                    </td>
                    <td className="px-6 py-4 text-navy-800">{item.service_type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${QUOTE_STATUS_STYLES[item.status]}`}
                      >
                        {QUOTE_STATUS_LABELS[item.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RequestDetailDialog
        request={selected}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    </section>
  );
}
