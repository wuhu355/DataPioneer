import type {
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
} from '@/types/dashboard';
import type { AdapterFetchParams } from '../types';
import { delay, randomInt, randomFloat, getDaysForRange, getScaleForRange } from './common';
import { logger } from '@/utils/logger';

const log = (method: string) => logger.info('mock-adapter', method);

// ===== Overview Data — scaled by time range =====
export async function mockOverviewData(params: AdapterFetchParams): Promise<OverviewData> {
  log(`overview (${params.timeRange})`);
  await delay();
  const s = getScaleForRange(params.timeRange);
  return {
    totalUsers: randomInt(180000, 220000),
    totalOrders: Math.floor(randomInt(45000, 55000) * s),
    totalRevenue: parseFloat((randomFloat(8000000, 12000000, 2) * s).toFixed(2)),
    conversionRate: randomFloat(0.03, 0.08, 4),
    userGrowth: randomFloat(0.05, 0.25, 2),
    orderGrowth: randomFloat(-0.1, 0.3, 2),
    revenueGrowth: randomFloat(0.1, 0.35, 2),
    conversionGrowth: randomFloat(-0.05, 0.15, 2),
  };
}

// ===== Trend Data — variable point count =====
export async function mockTrendData(params: AdapterFetchParams): Promise<TrendData> {
  log(`trendData (${params.timeRange})`);
  await delay(300, 500);
  const count = getDaysForRange(params.timeRange);
  const categories = ['访问量', '订单量'];
  return {
    categories,
    series: categories.map((name) => ({
      name,
      data: Array.from({ length: count }, () => randomInt(2000, 8000)),
    })),
  };
}

// ===== Distribution Data — same structure, varies with time =====
export async function mockDistributionData(params: AdapterFetchParams): Promise<DistributionItem[]> {
  log(`distribution (${params.timeRange})`);
  await delay();
  const s = getScaleForRange(params.timeRange);
  const categories = ['电子产品', '服装鞋帽', '家居用品', '食品饮料', '美妆护肤', '其他'];
  const total = Math.floor(randomInt(80000, 120000) * Math.max(s, 0.05));
  let remaining = total;
  return categories.map((name, i) => {
    const isLast = i === categories.length - 1;
    const value = isLast ? remaining : randomInt(Math.floor(remaining * 0.1), Math.floor(remaining * 0.4));
    remaining -= value;
    return { name, value, percent: value / total };
  });
}

// ===== Map Data =====
const PROVINCES = [
  '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
  '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
  '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
  '香港', '澳门',
];

export async function mockMapData(params: AdapterFetchParams): Promise<MapDataItem[]> {
  log(`mapData (${params.timeRange})`);
  await delay(300, 500);
  const s = getScaleForRange(params.timeRange);
  return PROVINCES.map((name) => ({
    name,
    value: Math.floor(randomInt(1000, 50000) * Math.max(s, 0.05)),
  }));
}

// ===== Rankings =====
const BRAND_NAMES = [
  '先锋科技', '蓝海数据', '星辰互联', '云端智能', '极光软件',
  '磐石信息', '未来视界', '量子科技', '银河网络', '矩阵数据',
];

export async function mockRankings(params: AdapterFetchParams): Promise<RankingItem[]> {
  log(`rankings (${params.timeRange})`);
  await delay();
  const s = getScaleForRange(params.timeRange);
  return BRAND_NAMES.map((name, i) => ({
    rank: i + 1,
    name,
    value: Math.floor(randomInt(5000, 20000) * Math.max(s, 0.05)),
    growth: randomFloat(-0.15, 0.35, 2),
  }));
}

// ===== Gauge Data =====
export async function mockGaugeData(params: AdapterFetchParams): Promise<GaugeData> {
  log(`gaugeData (${params.timeRange})`);
  await delay();
  const baseValue = params.timeRange === 'year' ? randomInt(80, 98)
    : params.timeRange === 'today' ? randomInt(30, 60)
    : params.timeRange === 'week' ? randomInt(40, 75)
    : randomInt(65, 95);
  return {
    value: baseValue,
    min: 0,
    max: 100,
    unit: '%',
    label: `${params.timeRange === 'today' ? '今日' : params.timeRange === 'week' ? '本周' : params.timeRange === 'month' ? '本月' : '年度'}完成率`,
  };
}

// ===== Radar Data =====
export async function mockRadarData(params: AdapterFetchParams): Promise<RadarData> {
  log(`radarData (${params.timeRange})`);
  await delay();
  const indicators = [
    { name: '销售额', max: 100 },
    { name: '访问量', max: 100 },
    { name: '转化率', max: 100 },
    { name: '复购率', max: 100 },
    { name: '满意度', max: 100 },
    { name: '覆盖率', max: 100 },
  ];
  return {
    indicators,
    series: [{
      name: params.timeRange === 'today' ? '今日' : params.timeRange === 'week' ? '本周' : params.timeRange === 'month' ? '本月' : '全年',
      data: indicators.map(() => randomInt(40, 95)),
    }],
  };
}
