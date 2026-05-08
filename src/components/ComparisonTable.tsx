import React from 'react';
import styles from './ComparisonTable.module.css';

export interface ComparisonProduct {
  id: string | number;
  name: string;
  /** Optional tagline shown below the product name */
  tagline?: string;
  /** Mark this column as the recommended pick */
  highlighted?: boolean;
  /** Per-product CTA */
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ComparisonFeature {
  /** Section / row label */
  label: string;
  /** Optional inline help text */
  hint?: string;
  /**
   * One value per product, in the same order as the products array.
   * Booleans render as checkmark / X. Strings, numbers, and ReactNodes render as-is.
   */
  values: Array<boolean | string | number | React.ReactNode>;
}

export interface ComparisonTableProps {
  products: ComparisonProduct[];
  features: ComparisonFeature[];
  title?: string;
  subtitle?: string;
}

/**
 * Feature comparison matrix: products as columns, features as rows.
 * Sticky first column + sticky header for long matrices.
 */
export function ComparisonTable({
  products,
  features,
  title,
  subtitle,
}: ComparisonTableProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.cornerCell} scope="col">
                  <span className={styles.srOnly}>Feature</span>
                </th>
                {products.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={`${styles.productCell} ${p.highlighted ? styles.highlighted : ''}`}
                  >
                    <div className={styles.productName}>{p.name}</div>
                    {p.tagline && <div className={styles.productTagline}>{p.tagline}</div>}
                    {p.ctaHref && (
                      <a href={p.ctaHref} className={`btn-primary ${styles.cta}`}>
                        {p.ctaLabel || 'Choose'}
                      </a>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, fi) => (
                <tr key={fi}>
                  <th scope="row" className={styles.featureCell}>
                    <span>{feature.label}</span>
                    {feature.hint && <span className={styles.hint}>{feature.hint}</span>}
                  </th>
                  {feature.values.map((value, pi) => {
                    const isHighlighted = products[pi]?.highlighted;
                    return (
                      <td
                        key={pi}
                        className={`${styles.valueCell} ${
                          isHighlighted ? styles.highlightedCol : ''
                        }`}
                      >
                        {renderValue(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function renderValue(
  value: boolean | string | number | React.ReactNode
): React.ReactNode {
  if (value === true) {
    return (
      <span className={styles.checkmark} aria-label="Yes">
        &#10003;
      </span>
    );
  }
  if (value === false) {
    return (
      <span className={styles.cross} aria-label="No">
        &#10005;
      </span>
    );
  }
  return value;
}
