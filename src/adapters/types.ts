import type {
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
} from '@/types/dashboard';

/**
 * Data adapter interface — the contract all data sources must fulfill.
 * Implementations: MockAdapter (dev) | ApiAdapter (production).
 */
export interface IDataAdapter {
  /** Fetch KPI overview statistics */
  fetchOverview(): Promise<OverviewData>;

  /** Fetch time-series trend data */
  fetchTrendData(): Promise<TrendData>;

  /** Fetch distribution / proportion data */
  fetchDistribution(): Promise<DistributionItem[]>;

  /** Fetch China map regional data */
  fetchMapData(): Promise<MapDataItem[]>;

  /** Fetch ranking list */
  fetchRankings(): Promise<RankingItem[]>;

  /** Fetch gauge/dial data */
  fetchGaugeData(): Promise<GaugeData>;

  /** Fetch radar/spider data */
  fetchRadarData(): Promise<RadarData>;
}

/** Adapter fetch parameters (reserved for future API use) */
export interface AdapterFetchParams {
  timeRange?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: unknown;
}
