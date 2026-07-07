import type {
  OverviewData,
  TrendData,
  DistributionItem,
  MapDataItem,
  RankingItem,
  GaugeData,
  RadarData,
} from '@/types/dashboard';
import { delay, randomInt, randomFloat, randomPick, generateDates } from './common';
import { logger } from '@/utils/logger';

const log = (method: string) => logger.info('mock-adapter', `Generating mock data for: ${method}`);

// ===== Overview Data =====
export async function mockOverviewData(): Promise<OverviewData> {
  log('overview');
  await delay();
  return {
    totalUsers: randomInt(180000, 220000),
    totalOrders: randomInt(45000, 55000),
    totalRevenue: randomFloat(8000000, 12000000, 2),
    conversionRate: randomFloat(0.03, 0.08, 4),
    userGrowth: randomFloat(0.05, 0.25, 2),
    orderGrowth: randomFloat(-0.1, 0.3, 2),
    revenueGrowth: randomFloat(0.1, 0.35, 2),
    conversionGrowth: randomFloat(-0.05, 0.15, 2),
  };
}

// ===== Trend Data (30 days, 2 series) =====
export async function mockTrendData(): Promise<TrendData> {
  log('trendData');
  await delay(300, 500);
  void generateDates(30);
  const categories = ['访问量', '订单量'];
  return {
    categories,
    series: categories.map((name) => ({
      name,
      data: Array.from({ length: 30 }, () => randomInt(2000, 8000)),
    })),
  };
}

// ===== Distribution Data =====
export async function mockDistributionData(): Promise<DistributionItem[]> {
  log('distribution');
  await delay();
  const categories = ['电子产品', '服装鞋帽', '家居用品', '食品饮料', '美妆护肤', '其他'];
  const total = randomInt(80000, 120000);
  let remaining = total;
  return categories.map((name, i) => {
    const isLast = i === categories.length - 1;
    const value = isLast
      ? remaining
      : randomInt(Math.floor(remaining * 0.1), Math.floor(remaining * 0.4));
    remaining -= value;
    return { name, value, percent: value / total };
  });
}

// ===== Map Data (34 provinces) =====
const PROVINCES = [
  '北京',
  '天津',
  '河北',
  '山西',
  '内蒙古',
  '辽宁',
  '吉林',
  '黑龙江',
  '上海',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '广西',
  '海南',
  '重庆',
  '四川',
  '贵州',
  '云南',
  '西藏',
  '陕西',
  '甘肃',
  '青海',
  '宁夏',
  '新疆',
  '台湾',
  '香港',
  '澳门',
];

export async function mockMapData(): Promise<MapDataItem[]> {
  log('mapData');
  await delay(300, 500);
  return PROVINCES.map((name) => ({
    name,
    value: randomInt(1000, 50000),
  }));
}

// ===== Rankings =====
const BRAND_NAMES = [
  '先锋科技',
  '蓝海数据',
  '星辰互联',
  '云端智能',
  '极光软件',
  '磐石信息',
  '未来视界',
  '量子科技',
  '银河网络',
  '矩阵数据',
];

export async function mockRankings(): Promise<RankingItem[]> {
  log('rankings');
  await delay();
  return BRAND_NAMES.map((name, i) => ({
    rank: i + 1,
    name,
    value: randomInt(5000, 20000),
    growth: randomFloat(-0.15, 0.35, 2),
  }));
}

// ===== Gauge Data =====
export async function mockGaugeData(): Promise<GaugeData> {
  log('gaugeData');
  await delay();
  return {
    value: randomInt(65, 95),
    min: 0,
    max: 100,
    unit: '%',
    label: '完成率',
  };
}

// ===== Radar Data =====
export async function mockRadarData(): Promise<RadarData> {
  log('radarData');
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
    series: [
      {
        name: randomPick(['本月', '本年', '当前周期']),
        data: indicators.map(() => randomInt(40, 95)),
      },
    ],
  };
}
