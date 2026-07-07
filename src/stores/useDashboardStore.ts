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
} from '@/types';
import { createInitialAsyncState } from '@/types';
import { dashboardService } from '@/services';
import { logger } from '@/utils/logger';

const log = (msg: string, data?: unknown) => logger.debug('store', msg, data);

interface DashboardState {
  // Data domains
  overview: AsyncState<OverviewData>;
  trend: AsyncState<TrendData>;
  distribution: AsyncState<DistributionItem[]>;
  mapData: AsyncState<MapDataItem[]>;
  rankings: AsyncState<RankingItem[]>;
  gauge: AsyncState<GaugeData>;
  radar: AsyncState<RadarData>;

  // Combined loading
  isLoading: boolean;

  // Actions
  fetchOverview: () => Promise<void>;
  fetchTrendData: () => Promise<void>;
  fetchDistribution: () => Promise<void>;
  fetchMapData: () => Promise<void>;
  fetchRankings: () => Promise<void>;
  fetchGaugeData: () => Promise<void>;
  fetchRadarData: () => Promise<void>;
  fetchAll: () => Promise<void>;
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

/**
 * Generic fetch wrapper: set loading → call service → set data or error.
 */
async function fetchDomain<T>(
  domain: keyof DashboardState,
  fetcher: () => Promise<T>,
  set: (partial: Partial<DashboardState>) => void,
): Promise<void> {
  log(`Fetching ${domain}...`);
  set({
    [domain]: { data: null, loading: true, error: null },
    isLoading: true,
  } as Partial<DashboardState>);
  try {
    const data = await fetcher();
    set({ [domain]: { data, loading: false, error: null } } as Partial<DashboardState>);
    log(`${domain} loaded successfully`, data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('store', `Failed to fetch ${domain}: ${message}`);
    set({ [domain]: { data: null, loading: false, error: message } } as Partial<DashboardState>);
  }
}

export const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState,

  fetchOverview: () => fetchDomain('overview', () => dashboardService.getOverview(), set),
  fetchTrendData: () => fetchDomain('trend', () => dashboardService.getTrendData(), set),
  fetchDistribution: () =>
    fetchDomain('distribution', () => dashboardService.getDistribution(), set),
  fetchMapData: () => fetchDomain('mapData', () => dashboardService.getMapData(), set),
  fetchRankings: () => fetchDomain('rankings', () => dashboardService.getRankings(), set),
  fetchGaugeData: () => fetchDomain('gauge', () => dashboardService.getGaugeData(), set),
  fetchRadarData: () => fetchDomain('radar', () => dashboardService.getRadarData(), set),

  fetchAll: async () => {
    log('Fetching all dashboard data...');
    set({ isLoading: true });
    try {
      const results = await dashboardService.getAllData();
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
      log('All dashboard data loaded');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('store', `Failed to fetch all data: ${message}`);
      set({ isLoading: false });
    }
  },

  reset: () => set({ ...initialState }),
}));
