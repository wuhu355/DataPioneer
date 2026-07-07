import { type ReactNode, useEffect, useRef, useState, useCallback } from 'react';
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

  const cardRef = useRef<HTMLDivElement>(null);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});

  const calcFly = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const cy = window.innerHeight / 2 - (rect.top + rect.height / 2);
    const s = Math.min(
      (window.innerWidth * 0.64) / rect.width,
      (window.innerHeight * 0.76) / rect.height,
      1.3,
    );
    setFlyStyle({
      transform: `translate(${cx}px, ${cy}px) scale(${s})`,
      zIndex: 100,
    });
  }, []);

  useEffect(() => {
    if (isPinned) {
      calcFly();
      window.addEventListener('resize', calcFly);
      return () => window.removeEventListener('resize', calcFly);
    } else {
      setFlyStyle({});
    }
  }, [isPinned, calcFly]);

  const handleClick = () => {
    if (panelId) toggleFocusedPanel(panelId);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${active ? styles.cardActive : ''} ${isPinned ? styles.cardPinned : ''} ${isDimmed ? styles.cardDimmed : ''} ${panelId ? styles.cardInteractive : ''} ${className}`}
      style={isPinned ? flyStyle : undefined}
      onClick={handleClick}
    >
      {title && (
        <div className={styles.header}>
          <span className={styles.dot} />
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3 className={styles.title}>{title}</h3>
          {isPinned && <span className={styles.closeHint}>点击关闭 ✕</span>}
          <span className={styles.dotRight} />
        </div>
      )}
      <div className={`${styles.body} ${isPinned ? styles.bodyNoPointer : ''}`}>
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
