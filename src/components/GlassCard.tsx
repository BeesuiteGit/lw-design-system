/**
 * GlassCard — bundled copy from the `design-system-glassmorphism` skill.
 *
 * Why this file ships with the layouts:
 *  - Every layout in this skill imports `./GlassCard`. A standalone copy means
 *    the layout components compile and render correctly even if the user has
 *    not yet installed the design-system skill (they'll just see unstyled
 *    glass until they paste the design tokens CSS in).
 *  - When the user DOES install the design-system skill into the same
 *    `src/components/` folder, this file is overwritten by that skill's copy.
 *    The two are kept in sync — the API surface is identical.
 *
 * If you prefer a single source of truth via a path alias, delete this file
 * and rewrite the imports inside the layouts (e.g. `from '@design-system/GlassCard'`).
 */
import React from 'react';
import styles from './GlassCard.module.css';
import clsx from 'clsx';

export type GlassCardGradient = 'to-t' | 'to-br' | 'to-b';
export type GlassCardAccent = 'primary' | 'secondary' | 'accent';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes appended to the root element */
  className?: string;
  /** Enable hover lift + shadow (default true) */
  interactive?: boolean;
  /** Gradient direction (default 'to-br') */
  gradient?: GlassCardGradient;
  /** Border accent color (default 'primary') */
  accentColor?: GlassCardAccent;
}

/**
 * Modern glassmorphism card with backdrop blur.
 * TypeScript-first. Pairs with design-tokens.css.
 */
export function GlassCard({
  children,
  className,
  interactive = true,
  gradient = 'to-br',
  accentColor = 'primary',
  ...props
}: GlassCardProps): JSX.Element {
  return (
    <div
      className={clsx(
        styles.card,
        interactive && styles.interactive,
        styles[`gradient-${gradient}`],
        styles[`accent-${accentColor}`],
        className
      )}
      {...props}
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
