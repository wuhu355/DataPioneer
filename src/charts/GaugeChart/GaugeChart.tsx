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
  height = 260,
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
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || !data) return;

    instanceRef.current.setOption({
      backgroundColor: 'transparent',
      series: [
        {
          type: 'gauge',
          startAngle: 210,
          endAngle: -30,
          center: ['50%', '55%'],
          radius: '85%',
          min: data.min,
          max: data.max,
          splitNumber: 10,
          axisLine: {
            show: true,
            lineStyle: {
              width: 16,
              color: [
                [0.3, '#00e396'],
                [0.7, '#00d4ff'],
                [1, '#ff6b6b'],
              ],
            },
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '70%',
            width: 6,
            offsetCenter: [0, '-10%'],
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            length: 10,
            lineStyle: { color: 'auto', width: 1.5 },
          },
          splitLine: {
            length: 20,
            lineStyle: { color: 'auto', width: 3 },
          },
          axisLabel: {
            color: '#a3b1cc',
            fontSize: 10,
            distance: 20,
          },
          title: {
            offsetCenter: [0, '35%'],
            color: '#a3b1cc',
            fontSize: 13,
          },
          detail: {
            valueAnimation: true,
            fontSize: 32,
            fontWeight: 'bold',
            offsetCenter: [0, '65%'],
            formatter: `{value}${data.unit ?? '%'}`,
            color: '#fff',
          },
          data: [{ value: data.value, name: data.label ?? '完成率' }],
        },
      ],
    });
  }, [data]);

  return (
    <Card title="仪表盘" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
