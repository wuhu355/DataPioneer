import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Component that throws
function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test explosion!');
  return <div>All good</div>;
}

describe('ErrorBoundary', () => {
  // Suppress error logs during error boundary tests
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('should show fallback UI when child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('页面发生错误')).toBeInTheDocument();
    expect(screen.getByText('Test explosion!')).toBeInTheDocument();
  });

  it('should show retry button that resets error', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    );
    const retryBtn = screen.getByText('重试');
    expect(retryBtn).toBeInTheDocument();

    // Clicking retry should attempt to re-render
    // Since Bomb still throws, it will catch again
    fireEvent.click(retryBtn);
    // The component tries to reset — but Bomb still throws so it shows error again
    expect(screen.getByText('页面发生错误')).toBeInTheDocument();
  });
});
