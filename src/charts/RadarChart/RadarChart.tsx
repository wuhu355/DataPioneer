import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import { CHART_COLORS } from '@/types/chart';
import type { BaseChartProps, RadarData } from '@/types';
import styles from './RadarChart.module.css';

export function RadarChart({
  data,
  loading = false,
  error = null,
  height = 280,
}: BaseChartProps<RadarData>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const instance = echarts.init(chartRef.current);
    instanceRef.current = instance;
    const onResize = () => instance.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      instance.dispose();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;

    instanceRef.current.setOption({
      color: CHART_COLORS,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(6, 30, 93, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#fff', fontSize: 12 },
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#a3b1cc', fontSize: 11 },
        data: data.series.map((s) => s.name),
      },
      radar: {
        center: ['50%', '45%'],
        radius: '60%',
        indicator: data.indicators,
        axisName: { color: '#a3b1cc', fontSize: 11 },
        splitArea: {
          areaStyle: {
            color: ['rgba(0, 212, 255, 0.02)', 'rgba(0, 212, 255, 0.04)'],
          },
        },
        splitLine: {
          lineStyle: { color: 'rgba(0, 212, 255, 0.15)' },
        },
        axisLine: {
          lineStyle: { color: 'rgba(0, 212, 255, 0.2)' },
        },
      },
      series: data.series.map((s) => ({
        name: s.name,
        type: 'radar',
        data: [{ value: s.data, name: s.name }],
        areaStyle: { opacity: 0.15 },
        lineStyle: { width: 2 },
        symbol: 'circle',
        symbolSize: 4,
      })),
    });
  }, [data]);

  return (
    <Card title="能力雷达" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
