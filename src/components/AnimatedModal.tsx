import React, { useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './AnimatedModal.module.css';

export interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * Modal with smooth backdrop + content animation.
 * Closes on backdrop click or Escape key.
 * Pure CSS Modules — works with or without Tailwind.
 */
export function AnimatedModal({
  isOpen,
  onClose,
  children,
  title,
}: AnimatedModalProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={styles.dialog}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              </div>
            )}

            <div className={styles.body}>{children}</div>

            <button
              type="button"
              onClick={onClose}
              className={styles.close}
              aria-label="Close"
            >
              &#10005;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
