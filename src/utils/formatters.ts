/**
 * Number formatting utilities for dashboard display.
 */

/** Format a number with optional decimal places */
export function formatNumber(value: number, decimals = 0): string {
  if (isNaN(value)) return '-';
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format as currency (CNY) */
export function formatCurrency(value: number): string {
  if (isNaN(value)) return '-';
  return value.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Format as percentage */
export function formatPercent(value: number, decimals = 1): string {
  if (isNaN(value)) return '-';
  return `${(value * 100).toFixed(decimals)}%`;
}

/** Compact number formatting (e.g. 1.2K, 3.5M) */
export function formatCompactNumber(value: number): string {
  if (isNaN(value)) return '-';
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}亿`;
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return formatNumber(value);
}

/** Format a Date or ISO string to display */
export function formatDate(date: Date | string, format = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '-';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/** Format number as time duration in mm:ss */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
