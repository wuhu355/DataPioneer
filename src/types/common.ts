// ===== Async State =====
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function createInitialAsyncState<T>(): AsyncState<T> {
  return { data: null, loading: false, error: null };
}

// ===== Time Range =====
export type TimeRange = 'today' | 'week' | 'month' | 'year' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

// ===== Utility Types =====
export type Nullable<T> = T | null;
export type ID = string | number;
export type ValueOf<T> = T[keyof T];
