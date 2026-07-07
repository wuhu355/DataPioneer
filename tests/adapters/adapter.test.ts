import { describe, it, expect } from 'vitest';
import { MockAdapter } from '@/adapters/mock';
import type { AdapterFetchParams } from '@/adapters/types';

const defaultParams: AdapterFetchParams = { timeRange: 'month' };

describe('MockAdapter', () => {
  const adapter = new MockAdapter();

  it('should return overview data with correct shape', async () => {
    const data = await adapter.fetchOverview(defaultParams);
    expect(data).toHaveProperty('totalUsers');
    expect(data).toHaveProperty('totalOrders');
    expect(data).toHaveProperty('totalRevenue');
    expect(data).toHaveProperty('conversionRate');
    expect(typeof data.totalUsers).toBe('number');
    expect(data.totalUsers).toBeGreaterThan(0);
  });

  it('should return trend data with categories and series', async () => {
    const data = await adapter.fetchTrendData(defaultParams);
    expect(data.categories).toBeInstanceOf(Array);
    expect(data.series).toBeInstanceOf(Array);
    expect(data.series.length).toBeGreaterThan(0);
    expect(data.series[0].data.length).toBeGreaterThan(0);
  });

  it('should return fewer trend data points for today', async () => {
    const data = await adapter.fetchTrendData({ timeRange: 'today' });
    expect(data.series[0].data.length).toBe(24); // hourly
  });

  it('should return 7 trend points for week', async () => {
    const data = await adapter.fetchTrendData({ timeRange: 'week' });
    expect(data.series[0].data.length).toBe(7);
  });

  it('should return 12 trend points for year', async () => {
    const data = await adapter.fetchTrendData({ timeRange: 'year' });
    expect(data.series[0].data.length).toBe(12); // monthly
  });

  it('should return distribution data with 6 items', async () => {
    const data = await adapter.fetchDistribution(defaultParams);
    expect(data).toHaveLength(6);
    data.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('percent');
    });
  });

  it('should return map data with 34 provinces', async () => {
    const data = await adapter.fetchMapData(defaultParams);
    expect(data).toHaveLength(34);
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('value');
  });

  it('should return 10 ranking items sorted by rank', async () => {
    const data = await adapter.fetchRankings(defaultParams);
    expect(data).toHaveLength(10);
    expect(data[0].rank).toBe(1);
    data.forEach((item) => {
      expect(item).toHaveProperty('rank');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('value');
    });
  });

  it('should return gauge data with value between min and max', async () => {
    const data = await adapter.fetchGaugeData(defaultParams);
    expect(data.value).toBeGreaterThanOrEqual(data.min);
    expect(data.value).toBeLessThanOrEqual(data.max);
  });

  it('should return radar data with indicators and series', async () => {
    const data = await adapter.fetchRadarData(defaultParams);
    expect(data.indicators).toBeInstanceOf(Array);
    expect(data.series).toBeInstanceOf(Array);
    expect(data.series[0].data.length).toBe(data.indicators.length);
  });
});
