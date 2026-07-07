// ===== Dashboard Domain Types =====

/** KPI overview statistics */
export interface OverviewData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  conversionRate: number;
  userGrowth: number;
  orderGrowth: number;
  revenueGrowth: number;
  conversionGrowth: number;
}

/** Time-series trend data point */
export interface TrendDataPoint {
  date: string;
  value: number;
  category?: string;
}

/** Multi-series trend data */
export interface TrendData {
  categories: string[];
  series: TrendSeries[];
}

export interface TrendSeries {
  name: string;
  data: number[];
}

/** Distribution / proportion data */
export interface DistributionItem {
  name: string;
  value: number;
  percent: number;
}

/** China map regional data */
export interface MapDataItem {
  name: string;
  value: number;
}

/** Ranking list item */
export interface RankingItem {
  rank: number;
  name: string;
  value: number;
  growth?: number;
}

/** Gauge chart data */
export interface GaugeData {
  value: number;
  min: number;
  max: number;
  unit?: string;
  label?: string;
}

/** Radar chart data */
export interface RadarData {
  indicators: RadarIndicator[];
  series: RadarSeries[];
}

export interface RadarIndicator {
  name: string;
  max: number;
}

export interface RadarSeries {
  name: string;
  data: number[];
}

/** Aggregate dashboard data — what the store holds */
export interface DashboardData {
  overview: OverviewData;
  trend: TrendData;
  distribution: DistributionItem[];
  mapData: MapDataItem[];
  rankings: RankingItem[];
  gauge: GaugeData;
  radar: RadarData;
}
