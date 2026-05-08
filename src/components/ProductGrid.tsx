import React from 'react';
import styles from './ProductGrid.module.css';
import { GlassCard } from './GlassCard';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  currency?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  description?: string;
}

export interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showPrice?: boolean;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
  /** Section title above the grid */
  title?: string;
  subtitle?: string;
}

/**
 * E-commerce product grid: image, price, rating, add-to-cart.
 * Responsive: 1 col mobile / 2 col tablet / `columns` col desktop.
 */
export function ProductGrid({
  products,
  columns = 3,
  showPrice = true,
  showRating = true,
  onAddToCart,
  title,
  subtitle,
}: ProductGridProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div
          className={styles.grid}
          style={{ '--cols': columns } as React.CSSProperties}
        >
          {products.map((product) => (
            <GlassCard key={product.id} className={styles.card} interactive>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
              </div>

              <div className={styles.body}>
                <h3 className={styles.name}>{product.name}</h3>
                {product.description && (
                  <p className={styles.description}>{product.description}</p>
                )}

                {showRating && typeof product.rating === 'number' && (
                  <div
                    className={styles.rating}
                    aria-label={`Rated ${product.rating} out of 5`}
                  >
                    <Stars value={product.rating} />
                    {typeof product.reviewCount === 'number' && (
                      <span className={styles.reviewCount}>({product.reviewCount})</span>
                    )}
                  </div>
                )}

                <div className={styles.footer}>
                  {showPrice && (
                    <span className={styles.price}>
                      {(product.currency || '$') + product.price.toFixed(2)}
                    </span>
                  )}
                  {onAddToCart && (
                    <button
                      type="button"
                      className={`btn-primary ${styles.cartBtn}`}
                      onClick={() => onAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }): JSX.Element {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className={styles.stars} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? styles.starFull : i === full && half ? styles.starHalf : styles.starEmpty}>
          &#9733;
        </span>
      ))}
    </span>
  );
}
