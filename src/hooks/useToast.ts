import { useState, useCallback } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastEntry {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export interface UseToastReturn {
  toasts: ToastEntry[];
  addToast: (message: string, type?: ToastType, duration?: number) => number;
  removeToast: (id: number) => void;
}

/**
 * Manage a stack of toast notifications.
 *
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast('Saved!', 'success');
 *
 * Render <ToastContainer toasts={toasts.map(t => ({ ...t, onDismiss: () => removeToast(t.id) }))} /> at root.
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 4000): number => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
