import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import { CHART_COLORS } from '@/types/chart';
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
  height = 280,
}: BaseChartProps<BarChartData>) {
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
        trigger: 'axis',
        backgroundColor: 'rgba(6, 30, 93, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#fff', fontSize: 12 },
      },
      grid: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50,
      },
      xAxis: {
        type: 'category',
        data: data.categories,
        axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } },
        axisLabel: { color: '#a3b1cc', fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } },
        axisLabel: { color: '#a3b1cc', fontSize: 10 },
      },
      series: [
        {
          type: 'bar',
          data: data.values.map((v) => ({
            value: v,
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: 'rgba(0,212,255,0.2)' },
              ]),
            },
          })),
          barWidth: '40%',
          label: {
            show: true,
            position: 'top',
            color: '#a3b1cc',
            fontSize: 10,
          },
        },
      ],
    });
  }, [data]);

  return (
    <Card title="分类统计" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
