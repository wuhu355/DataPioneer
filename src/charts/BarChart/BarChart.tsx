import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import type { BaseChartProps } from '@/types';
import styles from './BarChart.module.css';

interface BarChartData {
  categories: string[];
  values: number[];
}

export function BarChart({
  data,
  loading = false,
  error = null,
}: BaseChartProps<BarChartData>) {
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
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 22, 40, 0.92)',
        borderColor: 'rgba(79,172,254,0.3)',
        textStyle: { color: '#e8f0fe', fontSize: 11, fontFamily: 'Consolas, monospace' },
      },
      grid: { top: 16, right: 16, bottom: 28, left: 42 },
      xAxis: {
        type: 'category',
        data: data.categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#8da4c9', fontSize: 9, rotate: 30 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(79,172,254,0.06)' } },
        axisLabel: { color: '#4a6180', fontSize: 9 },
      },
      series: [{
        type: 'bar',
        data: data.values.map((v) => ({
          value: v,
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#4facfe' },
              { offset: 1, color: 'rgba(79,172,254,0.15)' },
            ]),
          },
        })),
        barWidth: '40%',
      }],
    });
  }, [data]);

  return (
    <Card title="分类统计" icon="📊" loading={loading} error={error} panelId="bar">
      <div ref={chartRef} className={styles.chart} />
    </Card>
  );
}
