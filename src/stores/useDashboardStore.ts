import { create } from 'zustand';
import type {
  AsyncState,
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
  TimeRange,
} from '@/types';
import { createInitialAsyncState } from '@/types';
import { dashboardService } from '@/services';
import { logger } from '@/utils/logger';

const log = (msg: string, data?: unknown) => logger.debug('store', msg, data);

interface DashboardState {
  overview: AsyncState<OverviewData>;
  trend: AsyncState<TrendData>;
  distribution: AsyncState<DistributionItem[]>;
  mapData: AsyncState<MapDataItem[]>;
  rankings: AsyncState<RankingItem[]>;
  gauge: AsyncState<GaugeData>;
  radar: AsyncState<RadarData>;
  isLoading: boolean;

  fetchAll: (timeRange: TimeRange) => Promise<void>;
  reset: () => void;
}

const initialState = {
  overview: createInitialAsyncState<OverviewData>(),
  trend: createInitialAsyncState<TrendData>(),
  distribution: createInitialAsyncState<DistributionItem[]>(),
  mapData: createInitialAsyncState<MapDataItem[]>(),
  rankings: createInitialAsyncState<RankingItem[]>(),
  gauge: createInitialAsyncState<GaugeData>(),
  radar: createInitialAsyncState<RadarData>(),
  isLoading: false,
};

export const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState,

  fetchAll: async (timeRange: TimeRange) => {
    log(`Fetching all dashboard data for ${timeRange}...`);
    set({ isLoading: true });
    const params = { timeRange };

    try {
      const results = await dashboardService.getAllData(params);
      set({
        overview: { data: results.overview, loading: false, error: null },
        trend: { data: results.trend, loading: false, error: null },
        distribution: { data: results.distribution, loading: false, error: null },
        mapData: { data: results.mapData, loading: false, error: null },
        rankings: { data: results.rankings, loading: false, error: null },
        gauge: { data: results.gauge, loading: false, error: null },
        radar: { data: results.radar, loading: false, error: null },
        isLoading: false,
      });
      log(`All dashboard data loaded for ${timeRange}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('store', `Failed to fetch data for ${timeRange}: ${message}`);
      set({ isLoading: false });
    }
  },

  reset: () => set({ ...initialState }),
}));
