import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import type { BaseChartProps, RadarData } from '@/types';
import styles from './RadarChart.module.css';

export function RadarChart({
  data,
  loading = false,
  error = null,
}: BaseChartProps<RadarData>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const instance = echarts.init(chartRef.current);
    instanceRef.current = instance;
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(chartRef.current);
    return () => {
      observer.disconnect();
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;

    instanceRef.current.setOption({
      color: ['#4facfe'],
      backgroundColor: 'transparent',
      radar: {
        center: ['50%', '48%'],
        radius: '60%',
        indicator: data.indicators,
        axisName: { color: '#8da4c9', fontSize: 10 },
        splitArea: {
          areaStyle: { color: ['rgba(79,172,254,0.02)', 'rgba(79,172,254,0.04)'] },
        },
        splitLine: { lineStyle: { color: 'rgba(79,172,254,0.1)' } },
        axisLine: { lineStyle: { color: 'rgba(79,172,254,0.15)' } },
      },
      series: data.series.map((s) => ({
        name: s.name,
        type: 'radar',
        data: [{ value: s.data, name: s.name }],
        areaStyle: { color: 'rgba(79,172,254,0.12)' },
        lineStyle: { color: '#4facfe', width: 2 },
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#4facfe' },
      })),
    });
  }, [data]);

  return (
    <Card title="能力雷达" icon="📡" loading={loading} error={error} panelId="radar">
      <div ref={chartRef} className={styles.chart} />
    </Card>
  );
}
