import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './LoadingSpinner.module.css';

export type LoadingSpinnerSize = 'sm' | 'md' | 'lg';

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
}

/**
 * Multi-layer loading spinner: rotating outer ring + pulsing inner dot.
 * Pure CSS Modules — colors come from design tokens.
 */
export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  const sizeClass: Record<LoadingSpinnerSize, string> = {
    sm: styles.sizeSm ?? '',
    md: styles.sizeMd ?? '',
    lg: styles.sizeLg ?? '',
  };

  const spinVariants: Variants = {
    animate: {
      rotate: shouldReduceMotion ? 0 : 360,
      transition: {
        duration: shouldReduceMotion ? 0 : 2,
        repeat: shouldReduceMotion ? 0 : Infinity,
        ease: 'linear',
      },
    },
  };

  const scaleVariants: Variants = {
    animate: {
      scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
      transition: {
        duration: shouldReduceMotion ? 0 : 1.5,
        repeat: shouldReduceMotion ? 0 : Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className={`${styles.spinner} ${sizeClass[size]}`}
      role="status"
      aria-label="Loading"
    >
      <motion.div className={styles.ring} variants={spinVariants} animate="animate" />
      <motion.div className={styles.dot} variants={scaleVariants} animate="animate" />
    </div>
  );
}
