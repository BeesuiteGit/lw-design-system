import React, { useEffect, useMemo, useState } from 'react';
import styles from './CaseStudyLayout.module.css';
import { GlassCard } from './GlassCard';

export interface RelatedCase {
  title: string;
  href: string;
  image?: string;
  excerpt?: string;
}

export interface TOCItem {
  id: string;
  label: string;
}

export interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  featuredImage: string;
  /** Article body. Render headings with `id` attributes for the TOC to link to. */
  content: React.ReactNode;
  author?: string;
  /** ISO date or display string */
  date?: string;
  /** Estimated read time in minutes */
  readTime?: number;
  /** Optional explicit table-of-contents items. If omitted, TOC is hidden. */
  toc?: TOCItem[];
  relatedCases?: RelatedCase[];
}

/**
 * Long-form case study or article layout.
 * Renders featured image, meta strip, optional sticky TOC, and related cards.
 */
export function CaseStudyLayout({
  title,
  subtitle,
  featuredImage,
  content,
  author,
  date,
  readTime,
  toc,
  relatedCases,
}: CaseStudyLayoutProps): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(toc?.[0]?.id ?? null);
  const ids = useMemo(() => toc?.map((t) => t.id) ?? [], [toc]);

  // Lightweight scroll-spy: sets activeId to the closest heading above the viewport top.
  useEffect(() => {
    if (ids.length === 0) return;
    const handler = (): void => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
      if (current) setActiveId(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [ids]);

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={featuredImage} alt="" />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {(author || date || typeof readTime === 'number') && (
            <div className={styles.meta}>
              {author && <span>{author}</span>}
              {author && date && <span aria-hidden="true">&bull;</span>}
              {date && <time>{date}</time>}
              {(author || date) && typeof readTime === 'number' && (
                <span aria-hidden="true">&bull;</span>
              )}
              {typeof readTime === 'number' && <span>{readTime} min read</span>}
            </div>
          )}
        </div>
      </header>

      <div className={styles.container}>
        {toc && toc.length > 0 && (
          <aside className={styles.toc} aria-label="Table of contents">
            <div className={styles.tocSticky}>
              <h2 className={styles.tocTitle}>On this page</h2>
              <ul>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={activeId === item.id ? styles.tocActive : undefined}
                      aria-current={activeId === item.id ? 'location' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        <div className={styles.content}>{content}</div>
      </div>

      {relatedCases && relatedCases.length > 0 && (
        <section className={styles.related} aria-label="Related case studies">
          <div className={styles.relatedContainer}>
            <h2>Related</h2>
            <div className={styles.relatedGrid}>
              {relatedCases.map((rc, i) => (
                <a key={i} href={rc.href} className={styles.relatedLink}>
                  <GlassCard className={styles.relatedCard} interactive>
                    {rc.image && (
                      <div className={styles.relatedImage}>
                        <img src={rc.image} alt="" />
                      </div>
                    )}
                    <h3>{rc.title}</h3>
                    {rc.excerpt && <p>{rc.excerpt}</p>}
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
