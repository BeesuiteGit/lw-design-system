import React, { useState } from 'react';
import styles from './AdminLayout.module.css';

export interface AdminLayoutProps {
  /** Sidebar nav content (links, sections) */
  sidebar?: React.ReactNode;
  /** Top bar content (search, profile, notifications) */
  topbar?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Controlled open state. Falls back to internal state if undefined. */
  sidebarOpen?: boolean;
  /** Called when the sidebar toggle is clicked */
  onToggleSidebar?: () => void;
  /** Brand element rendered above the sidebar (logo + name) */
  brand?: React.ReactNode;
}

/**
 * Admin dashboard shell: collapsible sidebar + topbar + content.
 * Mobile: sidebar slides in from the left as an overlay.
 */
export function AdminLayout({
  sidebar,
  topbar,
  children,
  sidebarOpen,
  onToggleSidebar,
  brand,
}: AdminLayoutProps): JSX.Element {
  const [internalOpen, setInternalOpen] = useState<boolean>(true);
  const isOpen = sidebarOpen ?? internalOpen;

  const toggle = (): void => {
    if (onToggleSidebar) onToggleSidebar();
    else setInternalOpen((v) => !v);
  };

  return (
    <div className={`${styles.shell} ${isOpen ? styles.open : styles.collapsed}`}>
      <aside className={styles.sidebar} aria-label="Sidebar navigation">
        <div className={styles.brand}>{brand}</div>
        <nav className={styles.nav}>{sidebar}</nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className={styles.scrim}
          onClick={toggle}
          aria-label="Close sidebar"
        />
      )}

      <div className={styles.body}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.toggle}
            onClick={toggle}
            aria-label={isOpen ? 'Collapse sidebar' : 'Open sidebar'}
            aria-expanded={isOpen}
          >
            <span aria-hidden="true">&#9776;</span>
          </button>
          <div className={styles.topbarContent}>{topbar}</div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
