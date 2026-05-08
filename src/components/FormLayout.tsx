import React, { useState } from 'react';
import styles from './FormLayout.module.css';
import { GlassCard } from './GlassCard';

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  /** For 'select' fields */
  options?: Array<{ value: string; label: string }>;
  /** Optional client-side validator. Return error string or undefined. */
  validate?: (value: string) => string | undefined;
}

export interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

export type FormData = Record<string, string>;

export interface FormLayoutProps {
  steps: FormStep[];
  onSubmit: (data: FormData) => void | Promise<void>;
  showProgress?: boolean;
  submitLabel?: string;
  /** Initial values for each field */
  initialValues?: FormData;
}

/**
 * Multi-step form wizard with progress bar, validation, prev/next.
 * Submits on the final step.
 */
export function FormLayout({
  steps,
  onSubmit,
  showProgress = true,
  submitLabel = 'Submit',
  initialValues = {},
}: FormLayoutProps): JSX.Element {
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [data, setData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const currentStep = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;
  const progress = ((stepIdx + 1) / steps.length) * 100;

  const validateStep = (): boolean => {
    if (!currentStep) return true;
    const next: Record<string, string> = {};
    for (const field of currentStep.fields) {
      const value = data[field.name] ?? '';
      if (field.required && !value.trim()) {
        next[field.name] = `${field.label} is required`;
        continue;
      }
      if (field.validate) {
        const err = field.validate(value);
        if (err) next[field.name] = err;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = (): void => {
    if (!validateStep()) return;
    setStepIdx((i) => Math.min(steps.length - 1, i + 1));
  };

  const handlePrev = (): void => {
    setStepIdx((i) => Math.max(0, i - 1));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (name: string, value: string): void => {
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (!currentStep) return <></>;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <GlassCard className={styles.card} interactive={false}>
        {showProgress && (
          <div
            className={styles.progressWrapper}
            role="progressbar"
            aria-valuenow={stepIdx + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-label={`Step ${stepIdx + 1} of ${steps.length}`}
          >
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            <div className={styles.steps}>
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`${styles.stepDot} ${i <= stepIdx ? styles.stepDotActive : ''}`}
                  aria-current={i === stepIdx ? 'step' : undefined}
                >
                  <span>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.header}>
          <h2>{currentStep.title}</h2>
          {currentStep.description && <p>{currentStep.description}</p>}
        </div>

        <div className={styles.fields}>
          {currentStep.fields.map((field) => {
            const value = data[field.name] ?? '';
            const error = errors[field.name];
            return (
              <div key={field.name} className={styles.field}>
                <label htmlFor={field.name}>
                  {field.label}
                  {field.required && (
                    <span className={styles.required} aria-hidden="true"> *</span>
                  )}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    rows={4}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    aria-invalid={!!error}
                  >
                    <option value="">{field.placeholder || 'Select...'}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || 'text'}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                  />
                )}
                {error && (
                  <span id={`${field.name}-error`} className={styles.error} role="alert">
                    {error}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.actions}>
          {stepIdx > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className={`btn-glass ${styles.btn}`}
            >
              Previous
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={handleNext}
              className={`btn-primary ${styles.btn} ${styles.btnPrimary}`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className={`btn-primary ${styles.btn} ${styles.btnPrimary}`}
            >
              {submitting ? 'Submitting...' : submitLabel}
            </button>
          )}
        </div>
      </GlassCard>
    </form>
  );
}
