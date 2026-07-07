import type { TimeRange } from '@/types';
import { useUIStore } from '@/stores/useUIStore';
import styles from './DatePicker.module.css';

const RANGE_OPTIONS: { key: TimeRange; label: string }[] = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'year', label: '全年' },
];

export function DatePicker() {
  const timeRange = useUIStore((s) => s.timeRange);
  const setTimeRange = useUIStore((s) => s.setTimeRange);

  return (
    <div className={styles.container}>
      {RANGE_OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.btn} ${timeRange === key ? styles.active : ''}`}
          onClick={() => setTimeRange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
