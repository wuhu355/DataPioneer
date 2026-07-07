import type { IDataAdapter } from '../types';
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
 * API data adapter — stub implementation.
 *
 * When switching to real API, replace each method's body with an actual
 * fetch call. Example:
 *   return fetch('/api/overview').then(r => r.json());
 */
export class ApiAdapter implements IDataAdapter {
  private notImplemented(method: string): never {
    throw new Error(
      `[ApiAdapter] ${method}() is not implemented yet. ` +
        `Update src/adapters/api/dashboard.api.ts with your API endpoint.`,
    );
  }

  async fetchOverview(): Promise<OverviewData> {
    this.notImplemented('fetchOverview');
  }

  async fetchTrendData(): Promise<TrendData> {
    this.notImplemented('fetchTrendData');
  }

  async fetchDistribution(): Promise<DistributionItem[]> {
    this.notImplemented('fetchDistribution');
  }

  async fetchMapData(): Promise<MapDataItem[]> {
    this.notImplemented('fetchMapData');
  }

  async fetchRankings(): Promise<RankingItem[]> {
    this.notImplemented('fetchRankings');
  }

  async fetchGaugeData(): Promise<GaugeData> {
    this.notImplemented('fetchGaugeData');
  }

  async fetchRadarData(): Promise<RadarData> {
    this.notImplemented('fetchRadarData');
  }
}
