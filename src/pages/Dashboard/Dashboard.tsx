import { useEffect } from 'react';
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

  useEffect(() => {
    initLogger();
    logger.info('dashboard', 'Dashboard mounted — fetching all data');
    fetchAll();
  }, [fetchAll]);

  // Build ranking data for bar chart
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
        {/* Top Header */}
        <div className={styles.header}>
          <Header />
        </div>

        {/* Time Picker */}
        <div className={styles.datePicker}>
          <DatePicker />
        </div>

        {/* KPI Stat Tiles */}
        <div className={styles.stats}>
          <StatTile
            label="总用户数"
            value={overview.data?.totalUsers ?? 0}
            icon="👥"
            color="#00d4ff"
            growth={overview.data?.userGrowth}
          />
          <StatTile
            label="总订单数"
            value={overview.data?.totalOrders ?? 0}
            icon="📦"
            color="#7b2fff"
            growth={overview.data?.orderGrowth}
          />
          <StatTile
            label="总收入"
            value={overview.data?.totalRevenue ?? 0}
            icon="💰"
            color="#00e396"
            growth={overview.data?.revenueGrowth}
            format="compact"
          />
          <StatTile
            label="转化率"
            value={overview.data?.conversionRate ?? 0}
            icon="📈"
            color="#feb019"
            growth={overview.data?.conversionGrowth}
            format="percent"
          />
        </div>

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          {/* Left column */}
          <div className={styles.trendChart}>
            <LineChart data={trend.data} loading={trend.loading} error={trend.error} height={300} />
          </div>

          {/* Center — Map */}
          <div className={styles.mapChart}>
            <MapChart
              data={mapData.data}
              loading={mapData.loading}
              error={mapData.error}
              height={380}
            />
          </div>

          {/* Right column */}
          <div className={styles.pieChart}>
            <PieChart
              data={distribution.data}
              loading={distribution.loading}
              error={distribution.error}
              height={300}
            />
          </div>

          {/* Bottom row charts */}
          <div className={styles.barChart}>
            <BarChart
              data={rankingBarData}
              loading={rankings.loading}
              error={rankings.error}
              height={260}
            />
          </div>

          <div className={styles.gaugeChart}>
            <GaugeChart
              data={gauge.data}
              loading={gauge.loading}
              error={gauge.error}
              height={240}
            />
          </div>

          <div className={styles.radarChart}>
            <RadarChart
              data={radar.data}
              loading={radar.loading}
              error={radar.error}
              height={260}
            />
          </div>
        </div>

        {/* Loading overlay */}
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
