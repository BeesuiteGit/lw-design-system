import React from 'react';
import styles from './BlogGrid.module.css';
import { GlassCard } from './GlassCard';

export interface BlogArticle {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

export interface BlogGridProps {
  articles: BlogArticle[];
  /** Override the default (first article) as featured. */
  featured?: BlogArticle;
}

/**
 * Featured article + responsive card grid.
 */
export function BlogGrid({ articles, featured }: BlogGridProps): JSX.Element | null {
  if (!articles || articles.length === 0) return null;

  const featuredArticle = featured || articles[0];
  if (!featuredArticle) return null;

  const otherArticles = featured ? articles : articles.slice(1);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <GlassCard className={styles.featured} interactive>
          <div className={styles.featuredImage}>
            <img src={featuredArticle.image} alt={featuredArticle.title} />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.tag}>{featuredArticle.category}</span>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.excerpt}</p>
            <div className={styles.meta}>
              <span>{featuredArticle.author}</span>
              <span aria-hidden="true">&bull;</span>
              <span>{featuredArticle.date}</span>
            </div>
          </div>
        </GlassCard>

        <div className={styles.grid}>
          {otherArticles.map((article, idx) => (
            <GlassCard key={idx} className={styles.card} interactive>
              <div className={styles.imageWrapper}>
                <img src={article.image} alt={article.title} />
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className={styles.meta}>
                  <span>{article.author}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
