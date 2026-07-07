/**
 * Mock utility functions — random data generation helpers.
 */

/** Simulate network delay (200-600ms) */
export function delay(min = 200, max = 600): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
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

/** Generate an array of sequential dates */
export function generateDates(days: number, endDate = new Date()): string[] {
  const dates: string[] = [];
  const end = new Date(endDate);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    dates.push(formatDateStr(d));
  }
  return dates;
}

function formatDateStr(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day}`;
}
