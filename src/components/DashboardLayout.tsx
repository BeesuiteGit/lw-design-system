import React from 'react';
import styles from './DashboardLayout.module.css';
import { GlassCard, type GlassCardAccent } from './GlassCard';

export interface DashboardWidget {
  title: string;
  content: React.ReactNode;
  span?: number;
  rowSpan?: number;
  color?: GlassCardAccent;
}

export interface DashboardLayoutProps {
  widgets: DashboardWidget[];
}

/**
 * Auto-fit widget grid for dashboards.
 */
export function DashboardLayout({ widgets }: DashboardLayoutProps): JSX.Element {
  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {widgets.map((widget, idx) => (
            <div
              key={idx}
              className={styles.widgetWrapper}
              style={{
                gridColumn: widget.span ? `span ${widget.span}` : undefined,
                gridRow: widget.rowSpan ? `span ${widget.rowSpan}` : undefined,
              }}
            >
              <GlassCard className={styles.widget} accentColor={widget.color}>
                <h3>{widget.title}</h3>
                {widget.content}
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
