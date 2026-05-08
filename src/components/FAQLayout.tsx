import React, { useState } from 'react';
import styles from './FAQLayout.module.css';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQLayoutProps {
  items: FAQItem[];
  /** Allow more than one item to be open at the same time */
  allowMultipleOpen?: boolean;
  /** Index of item open on first render (default 0; pass -1 to start all closed) */
  defaultOpen?: number;
  title?: string;
  subtitle?: string;
}

/**
 * Accordion FAQ. Smooth expand/collapse via CSS grid-template-rows trick,
 * which respects prefers-reduced-motion automatically through the media query.
 */
export function FAQLayout({
  items,
  allowMultipleOpen = false,
  defaultOpen = 0,
  title,
  subtitle,
}: FAQLayoutProps): JSX.Element {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );

  const toggle = (idx: number): void => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (allowMultipleOpen) {
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
      } else {
        if (next.has(idx)) next.clear();
        else {
          next.clear();
          next.add(idx);
        }
      }
      return next;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className={styles.list}>
          {items.map((item, i) => {
            const isOpen = openSet.has(i);
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.answerWrap}
                  hidden={!isOpen}
                >
                  <div className={styles.answer}>{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
