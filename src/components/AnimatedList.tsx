import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface AnimatedListProps<T> {
  /** Items to render */
  items: T[];
  /** Render function called for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Seconds before the cascade starts (default 0) */
  delay?: number;
}

/**
 * Cascading list entrance.
 * Each child fades in and slides 20px from the left, 0.1s apart.
 */
export function AnimatedList<T>({
  items,
  renderItem,
  delay = 0,
}: AnimatedListProps<T>): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      {items.map((item, idx) => (
        <motion.li key={idx} variants={itemVariants}>
          {renderItem(item, idx)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
