import { createDataAdapter, type IDataAdapter } from '@/adapters';
import type { AdapterFetchParams } from '@/adapters/types';
import type { DashboardData } from '@/types/dashboard';
import { logger } from '@/utils/logger';

class DashboardService {
  private adapter: IDataAdapter;

  constructor(adapter: IDataAdapter) {
    this.adapter = adapter;
    logger.info('service', 'DashboardService initialized');
  }

  setAdapter(adapter: IDataAdapter): void {
    this.adapter = adapter;
    logger.info('service', 'Adapter replaced');
  }

  async getOverview(params: AdapterFetchParams) {
    return this.adapter.fetchOverview(params);
  }

  async getTrendData(params: AdapterFetchParams) {
    return this.adapter.fetchTrendData(params);
  }

  async getDistribution(params: AdapterFetchParams) {
    return this.adapter.fetchDistribution(params);
  }

  async getMapData(params: AdapterFetchParams) {
    return this.adapter.fetchMapData(params);
  }

  async getRankings(params: AdapterFetchParams) {
    const data = await this.adapter.fetchRankings(params);
    return data.sort((a, b) => a.rank - b.rank);
  }

  async getGaugeData(params: AdapterFetchParams) {
    return this.adapter.fetchGaugeData(params);
  }

  async getRadarData(params: AdapterFetchParams) {
    return this.adapter.fetchRadarData(params);
  }

  async getAllData(params: AdapterFetchParams): Promise<DashboardData> {
    const [overview, trend, distribution, mapData, rankings, gauge, radar] = await Promise.all([
      this.adapter.fetchOverview(params),
      this.adapter.fetchTrendData(params),
      this.adapter.fetchDistribution(params),
      this.adapter.fetchMapData(params),
      this.adapter.fetchRankings(params).then((d) => d.sort((a, b) => a.rank - b.rank)),
      this.adapter.fetchGaugeData(params),
      this.adapter.fetchRadarData(params),
    ]);
    return { overview, trend, distribution, mapData, rankings, gauge, radar };
  }
}

export const dashboardService = new DashboardService(createDataAdapter());
