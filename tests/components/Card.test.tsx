import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Hello World</Card>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<Card title="测试标题">Content</Card>);
    expect(screen.getByText('测试标题')).toBeInTheDocument();
  });

  it('should show loading spinner when loading=true', () => {
    render(<Card loading={true}>Content</Card>);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('should show error message when error is provided', () => {
    render(<Card error="Something went wrong">Content</Card>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should show empty text when empty=true and not loading', () => {
    render(
      <Card empty={true} emptyText="自定义空提示">
        Content
      </Card>,
    );
    expect(screen.getByText('自定义空提示')).toBeInTheDocument();
  });

  it('should not render children when loading', () => {
    render(
      <Card loading={true}>
        <span data-testid="child">Child</span>
      </Card>,
    );
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });
});
