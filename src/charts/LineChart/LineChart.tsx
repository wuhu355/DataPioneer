import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import type { BaseChartProps, TrendData } from '@/types';
import styles from './LineChart.module.css';

const GRADIENT_COLORS = ['#4facfe', '#a18cd1', '#43e97b'];

export function LineChart({
  data,
  loading = false,
  error = null,
}: BaseChartProps<TrendData>) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const instance = echarts.init(chartRef.current);
    instanceRef.current = instance;
    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => instance.resize());
    });
    observer.observe(chartRef.current);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;

    instanceRef.current.setOption({
      color: GRADIENT_COLORS,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 22, 40, 0.92)',
        borderColor: 'rgba(79,172,254,0.3)',
        textStyle: { color: '#e8f0fe', fontSize: 11, fontFamily: 'Consolas, monospace' },
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#8da4c9', fontSize: 10 },
      },
      grid: { top: 16, right: 16, bottom: 36, left: 42 },
      xAxis: {
        type: 'category',
        data: data.series[0]?.data.map((_, i) => i + 1) ?? [],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#4a6180', fontSize: 9 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(79,172,254,0.06)' } },
        axisLabel: { color: '#4a6180', fontSize: 9 },
      },
      series: data.series.map((s, i) => ({
        name: s.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: GRADIENT_COLORS[i] ? `${GRADIENT_COLORS[i]}30` : 'rgba(79,172,254,0.18)' },
            { offset: 1, color: 'rgba(10,22,40,0)' },
          ]),
        },
        data: s.data,
      })),
    });
  }, [data]);

  return (
    <Card title="趋势分析" icon="📈" loading={loading} error={error} panelId="trend">
      <div ref={chartRef} className={styles.chart} />
    </Card>
  );
}
