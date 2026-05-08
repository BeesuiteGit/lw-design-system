import React from 'react';
import styles from './PricingTable.module.css';
import { GlassCard, type GlassCardAccent } from './GlassCard';

export interface PricingPlan {
  name: string;
  price: number;
  description?: string;
  cta?: string;
  featured?: boolean;
  color?: GlassCardAccent;
  features: string[];
}

export interface PricingTableProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
}

/**
 * Stripe-style pricing table.
 */
export function PricingTable({
  plans,
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the perfect plan for your needs',
}: PricingTableProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, idx) => (
            <GlassCard
              key={idx}
              className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
              accentColor={plan.color || 'primary'}
            >
              <h3>{plan.name}</h3>

              <div className={styles.price}>
                <span className={styles.amount}>${plan.price}</span>
                <span className={styles.period}>/month</span>
              </div>

              {plan.description && <p className={styles.description}>{plan.description}</p>}

              <button className="btn-primary" style={{ width: '100%' }}>
                {plan.cta || 'Get Started'}
              </button>

              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <span className={styles.checkmark} aria-hidden="true">
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
