// ===== Chart Type Enum =====
export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  MAP = 'map',
  GAUGE = 'gauge',
  RADAR = 'radar',
}

// ===== Chart Color Palette =====
export const CHART_COLORS: string[] = [
  '#00d4ff',
  '#7b2fff',
  '#ff6b6b',
  '#00e396',
  '#feb019',
  '#ff4081',
];

// ===== Chart Dimension & Measure =====
export interface ChartDimension {
  name: string;
  key: string;
}

export interface ChartMeasure {
  name: string;
  key: string;
  unit?: string;
}

// ===== Base Chart Props =====
export interface BaseChartProps<T = unknown> {
  data: T | null;
  loading?: boolean;
  error?: string | null;
  height?: number;
  className?: string;
}
