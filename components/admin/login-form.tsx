'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { getSupabase } from '@/lib/supabase/client';

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-200/60';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await getSupabase().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (signInError) {
      setError('Email atau kata sandi tidak sesuai. Silakan coba lagi.');
      setPassword('');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-navy-100 bg-white p-8 shadow-xl sm:p-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-gold-300">
        <Lock className="h-6 w-6" />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-navy-950">Masuk Admin</h1>
      <p className="mt-2 text-sm text-navy-700">Area ini khusus untuk tim administrator PGN.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-navy-900">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-navy-900">
            Kata Sandi
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
          />
        </div>

        {error ? (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
