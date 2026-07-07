import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import type { BaseChartProps, DistributionItem } from '@/types';
import styles from './PieChart.module.css';

const PIE_COLORS = ['#4facfe', '#a18cd1', '#43e97b', '#f5af19', '#fc5c65', '#6dd5ed'];

export function PieChart({
  data,
  loading = false,
  error = null,
}: BaseChartProps<DistributionItem[]>) {
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

    const total = data.reduce((sum, d) => sum + d.value, 0);

    instanceRef.current.setOption({
      color: PIE_COLORS,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10, 22, 40, 0.92)',
        borderColor: 'rgba(79,172,254,0.3)',
        textStyle: { color: '#e8f0fe', fontSize: 11 },
        formatter: '{b}: {c} ({d}%)',
      },
      series: [{
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['50%', '47%'],
        data: data.map((d) => ({ name: d.name, value: d.value })),
        label: { color: '#8da4c9', fontSize: 9 },
        emphasis: {
          scaleSize: 6,
          itemStyle: { shadowBlur: 12, shadowColor: 'rgba(79,172,254,0.4)' },
        },
        itemStyle: { borderColor: '#0a1628', borderWidth: 2 },
      }],
      graphic: [{
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: total.toLocaleString(),
          textAlign: 'center',
          fill: '#e8f0fe',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Consolas, monospace',
        },
      }],
    });
  }, [data]);

  return (
    <Card title="数据分布" icon="🍩" loading={loading} error={error} panelId="pie">
      <div ref={chartRef} className={styles.chart} />
    </Card>
  );
}
