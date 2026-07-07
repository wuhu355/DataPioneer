import type { IDataAdapter } from '../types';
import {
  mockOverviewData,
  mockTrendData,
  mockDistributionData,
  mockMapData,
  mockRankings,
  mockGaugeData,
  mockRadarData,
} from './chartData';

/**
 * Mock data adapter — returns realistic hardcoded data with artificial delay.
 * Used during development and demo mode.
 */
export class MockAdapter implements IDataAdapter {
  fetchOverview = mockOverviewData;
  fetchTrendData = mockTrendData;
  fetchDistribution = mockDistributionData;
  fetchMapData = mockMapData;
  fetchRankings = mockRankings;
  fetchGaugeData = mockGaugeData;
  fetchRadarData = mockRadarData;
}
