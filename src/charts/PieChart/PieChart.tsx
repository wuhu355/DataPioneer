import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import { CHART_COLORS } from '@/types/chart';
import type { BaseChartProps, DistributionItem } from '@/types';
import styles from './PieChart.module.css';

export function PieChart({
  data,
  loading = false,
  error = null,
  height = 280,
}: BaseChartProps<DistributionItem[]>) {
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

    const total = data.reduce((sum, d) => sum + d.value, 0);

    instanceRef.current.setOption({
      color: CHART_COLORS,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(6, 30, 93, 0.9)',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        textStyle: { color: '#fff', fontSize: 12 },
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 0,
        textStyle: { color: '#a3b1cc', fontSize: 11 },
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '45%'],
          data: data.map((d) => ({ name: d.name, value: d.value })),
          label: {
            color: '#a3b1cc',
            fontSize: 10,
            formatter: '{b}\n{d}%',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            scaleSize: 8,
          },
          itemStyle: {
            borderColor: '#0a0e27',
            borderWidth: 2,
          },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '38%',
          style: {
            text: `总计\n${total.toLocaleString()}`,
            textAlign: 'center',
            fill: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      ],
    });
  }, [data]);

  return (
    <Card title="数据分布" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
