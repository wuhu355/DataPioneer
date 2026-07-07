import type { IDataAdapter, AdapterFetchParams } from '../types';
import {
  mockOverviewData,
  mockTrendData,
  mockDistributionData,
  mockMapData,
  mockRankings,
  mockGaugeData,
  mockRadarData,
} from './chartData';

export class MockAdapter implements IDataAdapter {
  fetchOverview = (params: AdapterFetchParams) => mockOverviewData(params);
  fetchTrendData = (params: AdapterFetchParams) => mockTrendData(params);
  fetchDistribution = (params: AdapterFetchParams) => mockDistributionData(params);
  fetchMapData = (params: AdapterFetchParams) => mockMapData(params);
  fetchRankings = (params: AdapterFetchParams) => mockRankings(params);
  fetchGaugeData = (params: AdapterFetchParams) => mockGaugeData(params);
  fetchRadarData = (params: AdapterFetchParams) => mockRadarData(params);
}
