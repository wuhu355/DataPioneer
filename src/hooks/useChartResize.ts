import { useEffect, useRef, type RefObject } from 'react';
import type { EChartsType } from 'echarts';

/**
 * Hook that listens to container size changes via ResizeObserver
 * and calls chart.resize() automatically.
 *
 * Usage:
 *   const chartRef = useRef<EChartsType | null>(null);
 *   const containerRef = useChartResize(chartRef);
 *   return <div ref={containerRef}><Chart onInit={(c) => { chartRef.current = c; }} /></div>
 */
export function useChartResize(
  chartRef: RefObject<EChartsType | null>,
): RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const chart = chartRef.current;
    if (!container || !chart) return;

    const observer = new ResizeObserver(() => {
      chart.resize();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [chartRef]);

  return containerRef;
}
