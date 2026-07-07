import type { TimeRange } from '@/types/common';

/** Simulate network delay (200-600ms, shorter for "today") */
export function delay(min = 200, max = 600): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get data point count based on time range */
export function getDaysForRange(range: TimeRange): number {
  switch (range) {
    case 'today': return 24;    // hourly data points
    case 'week': return 7;      // daily
    case 'month': return 30;    // daily
    case 'year': return 12;     // monthly
    default: return 30;
  }
}

/** Get value multiplier for a range (smaller range → lower totals) */
export function getScaleForRange(range: TimeRange): number {
  switch (range) {
    case 'today': return 0.03;
    case 'week': return 0.2;
    case 'month': return 1;
    case 'year': return 12;
    default: return 1;
  }
}

/** Generate a random integer in [min, max] */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate a random float in [min, max) with given precision */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

/** Pick a random element from an array */
export function randomPick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Generate sequential date labels for the given time range */
export function generateDateLabels(range: TimeRange, endDate = new Date()): string[] {
  const count = getDaysForRange(range);
  const labels: string[] = [];
  const end = new Date(endDate);

  if (range === 'today') {
    for (let i = count - 1; i >= 0; i--) {
      labels.push(`${String(i).padStart(2, '0')}:00`);
    }
  } else if (range === 'year') {
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setMonth(d.getMonth() - i);
      labels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
  } else {
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(d.getDate() - i);
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      labels.push(`${m}-${day}`);
    }
  }
  return labels;
}
