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

  const formattedValue = ((): string => {
    switch (format) {
      case 'percent':
        return formatPercent(currentValue);
      case 'compact':
        return formatCompactNumber(currentValue);
      default:
        return formatCompactNumber(currentValue);
    }
  })();

  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div
      className={`${styles.tile} ${active ? styles.tileActive : ''} ${isPinned ? styles.tilePinned : ''} ${isDimmed ? styles.tileDimmed : ''} ${panelId ? styles.tileInteractive : ''}`}
      style={color ? { '--card-accent': color } as React.CSSProperties : undefined}
      onClick={() => panelId && toggleFocusedPanel(panelId)}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
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
