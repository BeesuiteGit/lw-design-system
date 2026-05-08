import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './AnimatedInput.module.css';

export interface AnimatedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text shown as a floating label */
  label: string;
  /** Input type (default 'text') */
  type?: string;
  /** Error message — shows below and turns the border red */
  error?: string;
  /** Success state — shows a checkmark and turns the border green */
  success?: boolean;
}

/**
 * Input with animated floating label and error/success states.
 * Pure CSS Modules — no Tailwind required. Reads design-tokens CSS variables
 * (--color-primary, --color-danger, --color-success) with safe fallbacks
 * if the design-system tokens aren't loaded.
 */
export function AnimatedInput({
  label,
  type = 'text',
  error,
  success,
  className,
  ...props
}: AnimatedInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const labelVariants: Variants = {
    floating: {
      y: shouldReduceMotion ? 0 : -22,
      scale: 0.85,
      x: shouldReduceMotion ? 0 : -4,
    },
    default: { y: '-50%', scale: 1, x: 0 },
  };

  const errorVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const fieldClassName = [
    styles.field,
    error ? styles.fieldError : '',
    !error && success ? styles.fieldSuccess : '',
    !error && !success && isFocused ? styles.fieldFocused : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={fieldClassName}>
        <motion.label
          className={styles.label}
          variants={labelVariants}
          animate={isFocused || hasValue ? 'floating' : 'default'}
          initial="default"
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          {label}
        </motion.label>

        <input
          type={type}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value !== '');
          }}
          onChange={(e) => setHasValue(e.target.value !== '')}
          {...props}
        />

        {success && !error && (
          <motion.div
            className={styles.successIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            aria-hidden="true"
          >
            &#10003;
          </motion.div>
        )}
      </div>

      {error && (
        <motion.span
          className={styles.error}
          variants={errorVariants}
          initial="hidden"
          animate="visible"
          role="alert"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}
