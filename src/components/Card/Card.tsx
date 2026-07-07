import type { ReactNode } from 'react';
import { Loading } from '@/components/Loading';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyText?: string;
  active?: boolean;
}

export function Card({
  title,
  children,
  className = '',
  loading = false,
  error = null,
  empty = false,
  emptyText = '暂无数据',
  active = false,
}: CardProps) {
  return (
    <div className={`${styles.card} ${active ? styles.cardActive : ''} ${className}`}>
      {title && (
        <div className={styles.header}>
          <span className={styles.accent} />
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.body}>
        {loading && <Loading />}
        {!loading && error && (
          <div className={styles.status}>
            <span className={styles.errorIcon}>⚠</span>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}
        {!loading && !error && empty && (
          <div className={styles.status}>
            <p className={styles.emptyText}>{emptyText}</p>
          </div>
        )}
        {!loading && !error && !empty && children}
      </div>
    </div>
  );
}
