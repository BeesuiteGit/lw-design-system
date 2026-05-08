import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { ToastType } from '../hooks/useToast';
import styles from './Toast.module.css';

export interface ToastProps {
  message: string;
  type?: ToastType;
  /** ms; 0 disables auto-dismiss (default 4000) */
  duration?: number;
  onDismiss: () => void;
}

const TYPE_CLASS: Record<ToastType, string> = {
  info: styles.info ?? '',
  success: styles.success ?? '',
  warning: styles.warning ?? '',
  error: styles.error ?? '',
};

/**
 * One toast notification with auto-dismiss.
 * Pure CSS Modules — colors come from the design tokens.
 */
export function Toast({
  message,
  type = 'info',
  duration = 4000,
  onDismiss,
}: ToastProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [duration, onDismiss]);

  return (
    <motion.div
      initial={{ x: shouldReduceMotion ? 0 : 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: shouldReduceMotion ? 0 : 400, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      className={`${styles.toast} ${TYPE_CLASS[type]}`}
      role="status"
    >
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className={styles.dismiss}
        aria-label="Dismiss notification"
      >
        &#10005;
      </button>
    </motion.div>
  );
}

export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: number | string }>;
}

/**
 * Manage a stack of toasts. Render once at the app root.
 */
export function ToastContainer({ toasts = [] }: ToastContainerProps): JSX.Element {
  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className={styles.containerItem}>
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
