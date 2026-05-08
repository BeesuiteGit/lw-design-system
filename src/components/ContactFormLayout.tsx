import React, { useState } from 'react';
import styles from './ContactFormLayout.module.css';
import { GlassCard } from './GlassCard';

export interface ContactData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export interface ContactFormLayoutProps {
  onSubmit: (data: ContactData) => void | Promise<void>;
  includeSubject?: boolean;
  includePhone?: boolean;
  successMessage?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Accessible contact form with client-side validation and success feedback.
 * Errors announced via aria-live; first invalid field auto-focused on submit.
 */
export function ContactFormLayout({
  onSubmit,
  includeSubject = true,
  includePhone = false,
  successMessage = "Thanks for reaching out!",
  title = 'Contact us',
  subtitle = "We'll get back to you within one business day.",
  submitLabel = 'Send message',
}: ContactFormLayoutProps): JSX.Element {
  const [data, setData] = useState<ContactData>({
    name: '',
    email: '',
    message: '',
    subject: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const update = <K extends keyof ContactData>(key: K, value: ContactData[K]): void => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactData, string>> = {};
    if (!data.name.trim()) next.name = 'Please enter your name';
    if (!data.email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_RE.test(data.email)) next.email = 'Please enter a valid email';
    if (!data.message.trim()) next.message = 'Please enter a message';
    if (includeSubject && !(data.subject ?? '').trim()) {
      next.subject = 'Please enter a subject';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validate()) {
      // Focus the first invalid field for accessibility
      const firstError = e.currentTarget.querySelector<HTMLInputElement>('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(data);
      setSuccess(true);
      setData({ name: '', email: '', message: '', subject: '', phone: '' });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <GlassCard className={styles.successCard}>
            <div className={styles.successIcon} aria-hidden="true">
              &#10003;
            </div>
            <h2>{successMessage}</h2>
            <button
              type="button"
              className={`btn-glass ${styles.resetBtn}`}
              onClick={() => setSuccess(false)}
            >
              Send another
            </button>
          </GlassCard>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <GlassCard className={styles.card} interactive={false}>
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            <div className={styles.row}>
              <Field
                id="contact-name"
                label="Name"
                value={data.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                required
                autoComplete="name"
              />
              <Field
                id="contact-email"
                label="Email"
                type="email"
                value={data.email}
                onChange={(v) => update('email', v)}
                error={errors.email}
                required
                autoComplete="email"
              />
            </div>

            {includePhone && (
              <Field
                id="contact-phone"
                label="Phone"
                type="tel"
                value={data.phone ?? ''}
                onChange={(v) => update('phone', v)}
                error={errors.phone}
                autoComplete="tel"
              />
            )}

            {includeSubject && (
              <Field
                id="contact-subject"
                label="Subject"
                value={data.subject ?? ''}
                onChange={(v) => update('subject', v)}
                error={errors.subject}
                required
              />
            )}

            <div className={styles.field}>
              <label htmlFor="contact-message">
                Message
                <span className={styles.required} aria-hidden="true"> *</span>
              </label>
              <textarea
                id="contact-message"
                value={data.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                rows={6}
                required
              />
              {errors.message && (
                <span id="contact-message-error" className={styles.error} role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`btn-primary ${styles.submitBtn}`}
            >
              {submitting ? 'Sending...' : submitLabel}
            </button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
  autoComplete,
}: FieldProps): JSX.Element {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        autoComplete={autoComplete}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
