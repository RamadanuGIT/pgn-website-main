'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/site/language-provider';
import { getSupabase } from '@/lib/supabase/client';
import { buildQuoteSchema, type QuoteFormValues } from '@/lib/validation/quote-request';
import { SERVICE_KEYS } from '@/lib/site-data';

type SubmitState = 'idle' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-400 transition-colors duration-200 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-200/60';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const { lang, t } = useLanguage();
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const schema = useMemo(() => buildQuoteSchema(t.contact.validation), [t]);
  const serviceOptions = useMemo(
    () => [...SERVICE_KEYS.map((key) => t.services.items[key].title), t.contact.form.serviceOther],
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      serviceType: '',
      message: '',
    },
  });

  const onSubmit = async (values: QuoteFormValues) => {
    setSubmitState('idle');
    try {
      const { error } = await getSupabase()
        .from('quote_requests')
        .insert({ ...values, locale: lang });
      if (error) throw error;
      reset();
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-navy-50/60 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-navy-950">{t.contact.form.successTitle}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-700">{t.contact.form.successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitState('idle')}
          className="mt-8 rounded-full border border-navy-950 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
        >
          {t.contact.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {submitState === 'error' ? (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-semibold text-red-800">{t.contact.form.errorTitle}</p>
            <p className="mt-1 text-sm text-red-700">{t.contact.form.errorBody}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-navy-900">
            {t.contact.form.companyName}
          </label>
          <input id="companyName" className={inputClass} autoComplete="organization" {...register('companyName')} />
          <FieldError message={errors.companyName?.message} />
        </div>
        <div>
          <label htmlFor="contactName" className="mb-2 block text-sm font-semibold text-navy-900">
            {t.contact.form.contactName}
          </label>
          <input id="contactName" className={inputClass} autoComplete="name" {...register('contactName')} />
          <FieldError message={errors.contactName?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy-900">
            {t.contact.form.email}
          </label>
          <input id="email" type="email" className={inputClass} autoComplete="email" {...register('email')} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy-900">
            {t.contact.form.phone}
          </label>
          <input id="phone" type="tel" className={inputClass} autoComplete="tel" {...register('phone')} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="serviceType" className="mb-2 block text-sm font-semibold text-navy-900">
          {t.contact.form.serviceType}
        </label>
        <select id="serviceType" className={inputClass} defaultValue="" {...register('serviceType')}>
          <option value="" disabled>
            {t.contact.form.servicePlaceholder}
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError message={errors.serviceType?.message} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy-900">
          {t.contact.form.message}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t.contact.form.messagePlaceholder}
          className={`${inputClass} resize-y`}
          {...register('message')}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.contact.form.submitting}
          </>
        ) : (
          t.contact.form.submit
        )}
      </button>
    </form>
  );
}
