import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type AnimatedButtonVariant = 'primary' | 'glass' | 'secondary';

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: AnimatedButtonVariant;
  disabled?: boolean;
}

/**
 * Button with spring-physics hover lift + tap depress.
 * Spring presets you can drop into other components:
 *   bouncy: { type: 'spring', stiffness: 300, damping: 10 }
 *   smooth: { type: 'spring', stiffness: 400, damping: 30 }
 *   stiff:  { type: 'spring', stiffness: 500, damping: 40 }
 */
export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  ...props
}: AnimatedButtonProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className={`btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={shouldReduceMotion || disabled ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion || disabled ? {} : { scale: 0.95 }}
      initial={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
