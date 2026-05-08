import React from 'react';
import styles from './HeroSection.module.css';
import { GlassCard } from './GlassCard';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  /** URL for full-bleed background image */
  backgroundImage?: string;
  /** Custom CTA element — replaces the default button */
  children?: React.ReactNode;
}

/**
 * Modern hero section with glassmorphism overlay.
 * Responsive, mobile-first.
 */
export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  children,
}: HeroSectionProps): JSX.Element {
  return (
    <section className={styles.hero}>
      <div
        className={styles.background}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
        aria-hidden="true"
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          {title && (
            <GlassCard className={styles.card}>
              <h1 className={styles.title}>{title}</h1>

              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

              {children || (
                <div className={styles.cta}>
                  <a href={ctaLink} className="btn-primary">
                    {ctaText || 'Get Started'}
                  </a>
                </div>
              )}
            </GlassCard>
          )}
        </div>
      </div>
    </section>
  );
}
