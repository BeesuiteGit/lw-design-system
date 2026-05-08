import React from 'react';
import styles from './TimelineLayout.module.css';
import { GlassCard } from './GlassCard';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export type TimelineOrientation = 'vertical' | 'horizontal';

export interface TimelineLayoutProps {
  events: TimelineEvent[];
  orientation?: TimelineOrientation;
  title?: string;
  subtitle?: string;
}

/**
 * Vertical or horizontal timeline.
 * Vertical: connecting line in the centre, alternating side cards.
 * Horizontal: scrollable strip with date badges along a top line.
 *
 * Entrance animation: each event fades in via CSS keyframes; consumers may wrap the
 * whole component in <ScrollFadeSection> for a stronger reveal-on-scroll effect.
 */
export function TimelineLayout({
  events,
  orientation = 'vertical',
  title,
  subtitle,
}: TimelineLayoutProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        {orientation === 'vertical' ? (
          <Vertical events={events} />
        ) : (
          <Horizontal events={events} />
        )}
      </div>
    </section>
  );
}

function Vertical({ events }: { events: TimelineEvent[] }): JSX.Element {
  return (
    <ol className={styles.vertical}>
      {events.map((event, i) => (
        <li
          key={i}
          className={`${styles.vItem} ${i % 2 === 0 ? styles.vLeft : styles.vRight}`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className={styles.vDate}>{event.date}</div>
          <div className={styles.vDot} aria-hidden="true" />
          <GlassCard className={styles.vCard} interactive>
            {event.image && (
              <div className={styles.image}>
                <img src={event.image} alt="" />
              </div>
            )}
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </GlassCard>
        </li>
      ))}
    </ol>
  );
}

function Horizontal({ events }: { events: TimelineEvent[] }): JSX.Element {
  return (
    <div className={styles.hScroll}>
      <ol className={styles.horizontal}>
        {events.map((event, i) => (
          <li
            key={i}
            className={styles.hItem}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={styles.hDot} aria-hidden="true" />
            <div className={styles.hDate}>{event.date}</div>
            <GlassCard className={styles.hCard} interactive>
              {event.image && (
                <div className={styles.image}>
                  <img src={event.image} alt="" />
                </div>
              )}
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </GlassCard>
          </li>
        ))}
      </ol>
    </div>
  );
}
