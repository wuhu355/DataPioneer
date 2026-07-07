import { useEffect, useRef } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Header } from '@/components/Header';
import { StatTile } from '@/components/StatTile';
import { DatePicker } from '@/components/DatePicker';
import { LineChart } from '@/charts/LineChart';
import { BarChart } from '@/charts/BarChart';
import { PieChart } from '@/charts/PieChart';
import { MapChart } from '@/charts/MapChart';
import { GaugeChart } from '@/charts/GaugeChart';
import { RadarChart } from '@/charts/RadarChart';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useUIStore } from '@/stores/useUIStore';
import { logger, initLogger } from '@/utils/logger';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const overview = useDashboardStore((s) => s.overview);
  const trend = useDashboardStore((s) => s.trend);
  const distribution = useDashboardStore((s) => s.distribution);
  const mapData = useDashboardStore((s) => s.mapData);
  const rankings = useDashboardStore((s) => s.rankings);
  const gauge = useDashboardStore((s) => s.gauge);
  const radar = useDashboardStore((s) => s.radar);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const fetchAll = useDashboardStore((s) => s.fetchAll);

  const timeRange = useUIStore((s) => s.timeRange);
  const isFirstMount = useRef(true);

  // Fetch on mount and whenever timeRange changes
  useEffect(() => {
    if (isFirstMount.current) {
      initLogger();
      isFirstMount.current = false;
    }
    logger.info('dashboard', `Time range changed to: ${timeRange} — refetching data`);
    fetchAll(timeRange);
  }, [timeRange, fetchAll]);

  const rankingBarData =
    rankings.data && !rankings.loading
      ? {
          categories: rankings.data.map((r) => r.name),
          values: rankings.data.map((r) => r.value),
        }
      : null;

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.datePicker}>
          <DatePicker />
        </div>

        <div className={styles.stats}>
          <StatTile
            label="总用户数"
            value={overview.data?.totalUsers ?? 0}
            icon="👥"
            color="#00d4ff"
            growth={overview.data?.userGrowth}
            panelId="users"
          />
          <StatTile
            label="总订单数"
            value={overview.data?.totalOrders ?? 0}
            icon="📦"
            color="#7b2fff"
            growth={overview.data?.orderGrowth}
            panelId="orders"
          />
          <StatTile
            label="总收入"
            value={overview.data?.totalRevenue ?? 0}
            icon="💰"
            color="#00e396"
            growth={overview.data?.revenueGrowth}
            format="compact"
            panelId="revenue"
          />
          <StatTile
            label="转化率"
            value={overview.data?.conversionRate ?? 0}
            icon="📈"
            color="#feb019"
            growth={overview.data?.conversionGrowth}
            format="percent"
            panelId="conversion"
          />
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.trendChart}>
            <LineChart data={trend.data} loading={trend.loading} error={trend.error} />
          </div>
          <div className={styles.mapChart}>
            <MapChart data={mapData.data} loading={mapData.loading} error={mapData.error} />
          </div>
          <div className={styles.pieChart}>
            <PieChart
              data={distribution.data}
              loading={distribution.loading}
              error={distribution.error}
            />
          </div>
          <div className={styles.barChart}>
            <BarChart
              data={rankingBarData}
              loading={rankings.loading}
              error={rankings.error}
            />
          </div>
          <div className={styles.gaugeChart}>
            <GaugeChart data={gauge.data} loading={gauge.loading} error={gauge.error} />
          </div>
          <div className={styles.radarChart}>
            <RadarChart data={radar.data} loading={radar.loading} error={radar.error} />
          </div>
        </div>

        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>数据加载中...</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
