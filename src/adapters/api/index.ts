import type { IDataAdapter, AdapterFetchParams } from '../types';
import type {
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
} from '@/types/dashboard';

export class ApiAdapter implements IDataAdapter {
  private notImplemented(method: string): never {
    throw new Error(
      `[ApiAdapter] ${method}() is not implemented yet. ` +
        `Update src/adapters/api/ with your API endpoints.`
    );
  }

  async fetchOverview(_params: AdapterFetchParams): Promise<OverviewData> {
    this.notImplemented('fetchOverview');
  }
  async fetchTrendData(_params: AdapterFetchParams): Promise<TrendData> {
    this.notImplemented('fetchTrendData');
  }
  async fetchDistribution(_params: AdapterFetchParams): Promise<DistributionItem[]> {
    this.notImplemented('fetchDistribution');
  }
  async fetchMapData(_params: AdapterFetchParams): Promise<MapDataItem[]> {
    this.notImplemented('fetchMapData');
  }
  async fetchRankings(_params: AdapterFetchParams): Promise<RankingItem[]> {
    this.notImplemented('fetchRankings');
  }
  async fetchGaugeData(_params: AdapterFetchParams): Promise<GaugeData> {
    this.notImplemented('fetchGaugeData');
  }
  async fetchRadarData(_params: AdapterFetchParams): Promise<RadarData> {
    this.notImplemented('fetchRadarData');
  }
}
