import { createDataAdapter, type IDataAdapter } from '@/adapters';
import type { DashboardData } from '@/types/dashboard';
import { logger } from '@/utils/logger';

/**
 * Dashboard service — business logic layer.
 * Connects the data adapter to the Zustand store.
 *
 * Responsibilities:
 * - Call adapter methods
 * - Transform / validate data before consumption
 * - Provide sensible defaults for missing/null values
 * - All business rules live here, not in components
 */
class DashboardService {
  private adapter: IDataAdapter;

  constructor(adapter: IDataAdapter) {
    this.adapter = adapter;
    logger.info('service', 'DashboardService initialized');
  }

  /** Change the data adapter at runtime (useful for testing) */
  setAdapter(adapter: IDataAdapter): void {
    this.adapter = adapter;
    logger.info('service', 'Adapter replaced');
  }

  async getOverview() {
    return this.adapter.fetchOverview();
  }

  async getTrendData() {
    return this.adapter.fetchTrendData();
  }

  async getDistribution() {
    return this.adapter.fetchDistribution();
  }

  async getMapData() {
    return this.adapter.fetchMapData();
  }

  async getRankings() {
    const data = await this.adapter.fetchRankings();
    // Ensure sorted by rank
    return data.sort((a, b) => a.rank - b.rank);
  }

  async getGaugeData() {
    return this.adapter.fetchGaugeData();
  }

  async getRadarData() {
    return this.adapter.fetchRadarData();
  }

  /** Fetch all dashboard data in parallel */
  async getAllData(): Promise<DashboardData> {
    const [overview, trend, distribution, mapData, rankings, gauge, radar] = await Promise.all([
      this.adapter.fetchOverview(),
      this.adapter.fetchTrendData(),
      this.adapter.fetchDistribution(),
      this.adapter.fetchMapData(),
      this.adapter.fetchRankings().then((d) => d.sort((a, b) => a.rank - b.rank)),
      this.adapter.fetchGaugeData(),
      this.adapter.fetchRadarData(),
    ]);

    return { overview, trend, distribution, mapData, rankings, gauge, radar };
  }
}

/** Singleton service instance — ready to use */
export const dashboardService = new DashboardService(createDataAdapter());
