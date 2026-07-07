import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import { CHART_COLORS } from '@/types/chart';
import type { BaseChartProps, TrendData } from '@/types';
import styles from './LineChart.module.css';

export function LineChart({
  data,
  loading = false,
  error = null,
  height = 280,
}: BaseChartProps<TrendData>) {
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

    const dates = data.series[0]?.data.map((_, i) => `第${i + 1}天`) ?? [];

    instanceRef.current.setOption({
      color: CHART_COLORS,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(6, 30, 93, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#fff', fontSize: 12 },
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#a3b1cc', fontSize: 11 },
        data: data.series.map((s) => s.name),
      },
      grid: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } },
        axisLabel: { color: '#a3b1cc', fontSize: 10 },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } },
        axisLabel: { color: '#a3b1cc', fontSize: 10 },
      },
      series: data.series.map((s) => ({
        name: s.name,
        type: 'line',
        smooth: true,
        data: s.data,
        symbol: 'none',
        lineStyle: { width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,212,255,0.25)' },
            { offset: 1, color: 'rgba(0,212,255,0.02)' },
          ]),
        },
      })),
    });
  }, [data]);

  return (
    <Card title="趋势分析" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
