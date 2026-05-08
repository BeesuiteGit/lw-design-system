import React, { useEffect, useState } from 'react';
import styles from './TestimonialSection.module.css';
import { GlassCard } from './GlassCard';

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export type TestimonialStyle = 'cards' | 'carousel' | 'list';

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
  style?: TestimonialStyle;
  showRating?: boolean;
  /** Auto-advance carousel (only when style='carousel') */
  autoPlay?: boolean;
  /** Auto-advance interval in ms (default 5000) */
  autoPlayInterval?: number;
  title?: string;
  subtitle?: string;
}

/**
 * Testimonials in three layouts: cards (grid), carousel, or list.
 */
export function TestimonialSection({
  testimonials,
  style = 'cards',
  showRating = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  title,
  subtitle,
}: TestimonialSectionProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        {style === 'carousel' && (
          <Carousel
            testimonials={testimonials}
            showRating={showRating}
            autoPlay={autoPlay}
            interval={autoPlayInterval}
          />
        )}
        {style === 'cards' && <Cards testimonials={testimonials} showRating={showRating} />}
        {style === 'list' && <List testimonials={testimonials} showRating={showRating} />}
      </div>
    </section>
  );
}

function Cards({
  testimonials,
  showRating,
}: {
  testimonials: Testimonial[];
  showRating: boolean;
}): JSX.Element {
  return (
    <div className={styles.cardsGrid}>
      {testimonials.map((t, i) => (
        <GlassCard key={i} className={styles.card} interactive>
          <Body t={t} showRating={showRating} />
        </GlassCard>
      ))}
    </div>
  );
}

function List({
  testimonials,
  showRating,
}: {
  testimonials: Testimonial[];
  showRating: boolean;
}): JSX.Element {
  return (
    <div className={styles.list}>
      {testimonials.map((t, i) => (
        <GlassCard key={i} className={styles.listItem} interactive={false}>
          <Body t={t} showRating={showRating} />
        </GlassCard>
      ))}
    </div>
  );
}

function Carousel({
  testimonials,
  showRating,
  autoPlay,
  interval,
}: {
  testimonials: Testimonial[];
  showRating: boolean;
  autoPlay: boolean;
  interval: number;
}): JSX.Element {
  const [idx, setIdx] = useState<number>(0);
  const total = testimonials.length;

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % total), interval);
    return () => window.clearInterval(id);
  }, [autoPlay, interval, total]);

  if (total === 0) return <></>;
  const current = testimonials[idx];
  if (!current) return <></>;

  return (
    <div className={styles.carousel} aria-roledescription="carousel">
      <GlassCard className={styles.carouselCard} interactive={false}>
        <Body t={current} showRating={showRating} />
      </GlassCard>
      <div className={styles.carouselControls}>
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + total) % total)}
          aria-label="Previous testimonial"
          className={styles.carouselBtn}
        >
          &larr;
        </button>
        <div className={styles.dots} role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % total)}
          aria-label="Next testimonial"
          className={styles.carouselBtn}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

function Body({ t, showRating }: { t: Testimonial; showRating: boolean }): JSX.Element {
  return (
    <div className={styles.body}>
      {showRating && typeof t.rating === 'number' && <Stars value={t.rating} />}
      <blockquote className={styles.quote}>{t.quote}</blockquote>
      <div className={styles.attribution}>
        {t.avatar && <img src={t.avatar} alt="" className={styles.avatar} />}
        <div>
          <div className={styles.author}>{t.author}</div>
          {t.role && <div className={styles.role}>{t.role}</div>}
        </div>
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }): JSX.Element {
  const full = Math.floor(value);
  return (
    <div className={styles.stars} aria-label={`Rated ${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? styles.starFull : styles.starEmpty} aria-hidden="true">
          &#9733;
        </span>
      ))}
    </div>
  );
}
