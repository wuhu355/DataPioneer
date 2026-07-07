import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts';
import { Card } from '@/components/Card';
import { CHART_COLORS } from '@/types/chart';
import type { BaseChartProps, MapDataItem } from '@/types';
import { logger } from '@/utils/logger';
import styles from './MapChart.module.css';

export function MapChart({
  data,
  loading = false,
  error = null,
  height = 400,
}: BaseChartProps<MapDataItem[]>) {
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

    // Load China map GeoJSON from CDN
    const loadMap = async () => {
      try {
        const registered = echarts.getMap('china');
        if (registered) {
          renderMap();
          return;
        }

        const resp = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        const geoJson = await resp.json();
        echarts.registerMap('china', geoJson);
        renderMap();
      } catch (err) {
        logger.error('MapChart', 'Failed to load China map GeoJSON', err);
        // Fallback: show data as bar chart
        renderFallback();
      }
    };

    const renderMap = () => {
      instanceRef.current?.setOption(
        {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(6, 30, 93, 0.9)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            textStyle: { color: '#fff', fontSize: 12 },
            formatter: '{b}: {c}',
          },
          visualMap: {
            min: 0,
            max: Math.max(...data.map((d) => d.value)),
            left: 'left',
            bottom: 20,
            text: ['高', '低'],
            textStyle: { color: '#a3b1cc' },
            inRange: {
              color: ['#0a1a3a', '#0d3b66', '#1a6b96', '#00a8cc', '#00d4ff'],
            },
            calculable: true,
          },
          series: [
            {
              type: 'map',
              map: 'china',
              roam: true,
              zoom: 1.2,
              center: [105, 36],
              data: data.map((d) => ({ name: d.name, value: d.value })),
              label: {
                show: true,
                color: '#a3b1cc',
                fontSize: 10,
              },
              emphasis: {
                label: { show: true, color: '#fff', fontSize: 12 },
                itemStyle: { areaColor: '#00d4ff' },
              },
              itemStyle: {
                borderColor: 'rgba(0, 212, 255, 0.3)',
                borderWidth: 1,
              },
            },
          ],
        },
        true,
      );
    };

    const renderFallback = () => {
      // Fallback when map JSON fails to load
      instanceRef.current?.setOption({
        color: CHART_COLORS,
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: data.map((d) => d.name),
          axisLabel: { color: '#a3b1cc', fontSize: 9, rotate: 45 },
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#a3b1cc', fontSize: 10 },
        },
        series: [
          {
            type: 'bar',
            data: data.map((d) => d.value),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: 'rgba(0,212,255,0.2)' },
              ]),
            },
          },
        ],
      });
    };

    loadMap();
  }, [data]);

  return (
    <Card title="全国分布" loading={loading} error={error}>
      <div ref={chartRef} className={styles.chart} style={{ height }} />
    </Card>
  );
}
