import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface PageTransitionProps {
  /** Page content */
  children: React.ReactNode;
  /** Seconds before the entrance starts (default 0) */
  delay?: number;
}

/**
 * Smooth fade + slide transition for page mount/unmount.
 * Wrap with <AnimatePresence mode="wait"> at the route level.
 */
export function PageTransition({ children, delay = 0 }: PageTransitionProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
        delay,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -20,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={variants}>
      {children}
    </motion.div>
  );
}
