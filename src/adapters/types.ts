import type {
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
} from '@/types/dashboard';
import type { TimeRange } from '@/types/common';

/** Adapter fetch parameters */
export interface AdapterFetchParams {
  timeRange: TimeRange;
}

/**
 * Data adapter interface — the contract all data sources must fulfill.
 * All fetch methods receive params so data can vary by time range.
 */
export interface IDataAdapter {
  fetchOverview(params: AdapterFetchParams): Promise<OverviewData>;
  fetchTrendData(params: AdapterFetchParams): Promise<TrendData>;
  fetchDistribution(params: AdapterFetchParams): Promise<DistributionItem[]>;
  fetchMapData(params: AdapterFetchParams): Promise<MapDataItem[]>;
  fetchRankings(params: AdapterFetchParams): Promise<RankingItem[]>;
  fetchGaugeData(params: AdapterFetchParams): Promise<GaugeData>;
  fetchRadarData(params: AdapterFetchParams): Promise<RadarData>;
}
