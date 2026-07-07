import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import type { BaseChartProps, GaugeData } from '@/types';
import styles from './GaugeChart.module.css';

export function GaugeChart({
  data,
  loading = false,
  error = null,
}: BaseChartProps<GaugeData>) {
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
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;

    instanceRef.current.setOption({
      backgroundColor: 'transparent',
      series: [{
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        center: ['50%', '55%'],
        radius: '85%',
        min: data.min,
        max: data.max,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.3, '#43e97b'],
              [0.7, '#4facfe'],
              [1, '#fc5c65'],
            ],
          },
        },
        pointer: { length: '65%', width: 5, itemStyle: { color: '#4facfe' } },
        axisTick: { length: 8, lineStyle: { color: 'auto', width: 1.5 } },
        splitLine: { length: 16, lineStyle: { color: 'auto', width: 2.5 } },
        axisLabel: { color: '#4a6180', fontSize: 9, distance: 16 },
        title: { offsetCenter: [0, '32%'], color: '#8da4c9', fontSize: 12 },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          fontWeight: 'bold',
          fontFamily: 'Consolas, monospace',
          offsetCenter: [0, '62%'],
          formatter: `{value}${data.unit ?? '%'}`,
          color: '#e8f0fe',
        },
        data: [{ value: data.value, name: data.label ?? '完成率' }],
      }],
    });
  }, [data]);

  return (
    <Card title="仪表盘" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} />
    </Card>
  );
}
