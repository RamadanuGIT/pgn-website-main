'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, LogOut, ShieldAlert } from 'lucide-react';
import { getSupabase } from '@/lib/supabase/client';
import { LoginForm } from '@/components/admin/login-form';
import { RequestsDashboard } from '@/components/admin/requests-dashboard';

type AccessState = 'checking' | 'signed-out' | 'admin' | 'forbidden' | 'error';

export function AdminPanel() {
  const [access, setAccess] = useState<AccessState>('checking');

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;

    const resolveAccess = async (hasSession: boolean) => {
      if (!hasSession) {
        if (active) setAccess('signed-out');
        return;
      }
      const { data, error } = await supabase.rpc('is_admin');
      if (!active) return;
      if (error) {
        setAccess('error');
        return;
      }
      setAccess(data === true ? 'admin' : 'forbidden');
    };

    supabase.auth.getSession().then(({ data }) => resolveAccess(Boolean(data.session)));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await resolveAccess(Boolean(session));
      })();
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = () => {
    void getSupabase().auth.signOut();
  };

  if (access === 'checking') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-navy-700">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (access === 'signed-out') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
        <LoginForm />
      </div>
    );
  }

  if (access === 'admin') {
    return (
      <div className="min-h-screen bg-navy-50/50">
        <header className="border-b border-navy-100 bg-navy-950">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-white">
              <span className="text-base font-bold tracking-wide">PGN</span>
              <span className="hidden text-sm text-white/60 sm:inline">Admin</span>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <Link href="/" className="text-white/75 transition-colors hover:text-gold-300">
                Lihat Situs
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-semibold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <RequestsDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="max-w-md rounded-3xl border border-navy-100 bg-white p-10 text-center shadow-xl">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldAlert className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-xl font-bold text-navy-950">
          {access === 'forbidden' ? 'Akun ini tidak memiliki akses admin' : 'Akses admin belum dapat dimuat'}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-navy-700">
          {access === 'forbidden'
            ? 'Silakan keluar dan masuk menggunakan akun administrator PGN.'
            : 'Terjadi kendala saat memeriksa akses. Silakan muat ulang halaman.'}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-8 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
