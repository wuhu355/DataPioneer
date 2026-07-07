import { useEffect, useRef, useState, useCallback } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { formatCompactNumber, formatPercent } from '@/utils/formatters';
import { useUIStore } from '@/stores/useUIStore';
import styles from './StatTile.module.css';

interface StatTileProps {
  label: string;
  value: number;
  unit?: string;
  growth?: number;
  icon?: string;
  color?: string;
  format?: 'number' | 'currency' | 'percent' | 'compact';
  active?: boolean;
  panelId?: string;
}

export function StatTile({
  label,
  value,
  unit = '',
  growth,
  icon = '📊',
  color,
  format = 'compact',
  active = false,
  panelId,
}: StatTileProps) {
  const currentValue = useCountUp(value, { duration: 1500 });
  const focusedPanel = useUIStore((s) => s.focusedPanel);
  const toggleFocusedPanel = useUIStore((s) => s.toggleFocusedPanel);
  const isPinned = panelId ? focusedPanel === panelId : false;
  const isDimmed = !!focusedPanel && !!panelId && focusedPanel !== panelId;

  const tileRef = useRef<HTMLDivElement>(null);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});

  const calcFly = useCallback(() => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const cx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const cy = window.innerHeight / 2 - (rect.top + rect.height / 2);
    const s = Math.min(
      (window.innerWidth * 0.35) / rect.width,
      (window.innerHeight * 0.5) / rect.height,
      1.4,
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

  const formattedValue = ((): string => {
    switch (format) {
      case 'percent': return formatPercent(currentValue);
      case 'compact': return formatCompactNumber(currentValue);
      default: return formatCompactNumber(currentValue);
    }
  })();

  const isPositive = growth !== undefined && growth >= 0;

  const handleClick = () => {
    if (panelId) toggleFocusedPanel(panelId);
  };

  return (
    <div
      ref={tileRef}
      className={`${styles.tile} ${active ? styles.tileActive : ''} ${isPinned ? styles.tilePinned : ''} ${isDimmed ? styles.tileDimmed : ''} ${panelId ? styles.tileInteractive : ''}`}
      style={{
        ...(color ? { '--card-accent': color } as React.CSSProperties : {}),
        ...(isPinned ? flyStyle : {}),
      }}
      onClick={handleClick}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
        {isPinned && <span className={styles.closeHint}>点击关闭 ✕</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.value}>{formattedValue}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {growth !== undefined && (
        <div className={styles.growth}>
          <span className={`${styles.growthArrow} ${isPositive ? styles.up : styles.down}`}>
            {isPositive ? '▲' : '▼'}
          </span>
          <span className={`${styles.growthValue} ${isPositive ? styles.growthUp : styles.growthDown}`}>
            {formatPercent(Math.abs(growth))}
          </span>
          <span className={styles.growthLabel}>较上期</span>
        </div>
      )}
    </div>
  );
}
