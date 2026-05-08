import React from 'react';
import styles from './FeatureGrid.module.css';
import { GlassCard, type GlassCardGradient, type GlassCardAccent } from './GlassCard';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

export interface FeatureGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

const GRADIENTS: GlassCardGradient[] = ['to-t', 'to-br', 'to-b'];
const ACCENTS: GlassCardAccent[] = ['primary', 'secondary', 'accent'];

/**
 * Responsive 3-column feature grid (1/2/3 cols at sm/md/lg).
 */
export function FeatureGrid({ features, title, subtitle }: FeatureGridProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <GlassCard
              key={idx}
              className={styles.card}
              interactive
              gradient={GRADIENTS[idx % 3] ?? 'to-br'}
              accentColor={ACCENTS[idx % 3] ?? 'primary'}
            >
              {feature.icon && <div className={styles.iconWrapper}>{feature.icon}</div>}

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              {feature.link && (
                <a href={feature.link} className={styles.link}>
                  Learn more &rarr;
                </a>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
