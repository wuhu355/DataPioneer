import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PieChart } from '@/charts/PieChart';
import type { DistributionItem } from '@/types';

const mockData: DistributionItem[] = [
  { name: 'A', value: 100, percent: 0.5 },
  { name: 'B', value: 80, percent: 0.4 },
  { name: 'C', value: 20, percent: 0.1 },
];

describe('PieChart', () => {
  it('should render without crashing with data', () => {
    const { container } = render(<PieChart data={mockData} />);
    // ECharts creates a canvas or div internally
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<PieChart data={null} loading={true} />);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    render(<PieChart data={null} error="Failed to load" />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('should render card title', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText('数据分布')).toBeInTheDocument();
  });
});
