import type { ReactNode } from 'react';
import { Loading } from '@/components/Loading';
import { useUIStore } from '@/stores/useUIStore';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyText?: string;
  active?: boolean;
  panelId?: string;
}

export function Card({
  title,
  icon,
  children,
  className = '',
  loading = false,
  error = null,
  empty = false,
  emptyText = '暂无数据',
  active = false,
  panelId,
}: CardProps) {
  const focusedPanel = useUIStore((s) => s.focusedPanel);
  const toggleFocusedPanel = useUIStore((s) => s.toggleFocusedPanel);

  const isPinned = panelId ? focusedPanel === panelId : false;
  const isDimmed = !!focusedPanel && !!panelId && focusedPanel !== panelId;

  const handleClick = () => {
    if (panelId) toggleFocusedPanel(panelId);
  };

  return (
    <div
      className={`${styles.card} ${active ? styles.cardActive : ''} ${isPinned ? styles.cardPinned : ''} ${isDimmed ? styles.cardDimmed : ''} ${panelId ? styles.cardInteractive : ''} ${className}`}
      onClick={handleClick}
    >
      {title && (
        <div className={styles.header}>
          <span className={styles.dot} />
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.dotRight} />
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
