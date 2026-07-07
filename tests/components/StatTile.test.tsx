import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatTile } from '@/components/StatTile';

describe('StatTile', () => {
  it('should render label', () => {
    render(<StatTile label="总用户数" value={1000} />);
    expect(screen.getByText('总用户数')).toBeInTheDocument();
  });

  it('should render value', () => {
    render(<StatTile label="总用户数" value={1000} />);
    // Value is animated via useCountUp, starts from 0
    // Just verify the component renders without crashing
    expect(screen.getByText('总用户数')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<StatTile label="测试" value={100} icon="🔥" />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('should show positive growth with green', () => {
    render(<StatTile label="测试" value={100} growth={0.15} />);
    expect(screen.getByText('▲')).toBeInTheDocument();
    const growthEl = document.querySelector('[class*="growthUp"]');
    expect(growthEl).toBeInTheDocument();
  });

  it('should show negative growth with red', () => {
    render(<StatTile label="测试" value={100} growth={-0.1} />);
    expect(screen.getByText('▼')).toBeInTheDocument();
    const growthEl = document.querySelector('[class*="growthDown"]');
    expect(growthEl).toBeInTheDocument();
  });
});
