import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface ScrollFadeSectionProps {
  children: React.ReactNode;
  /** 0..1, fraction of element visible to trigger (default 0.2) */
  threshold?: number;
}

/**
 * Wrap any block of content to fade + slide it in when it scrolls into view.
 */
export function ScrollFadeSection({
  children,
  threshold = 0.2,
}: ScrollFadeSectionProps): JSX.Element {
  const { ref, controls } = useScrollAnimation({ threshold });
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6 },
    },
  };

  return (
    <motion.section ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.section>
  );
}
