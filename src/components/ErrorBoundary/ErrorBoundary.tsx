import { Component, type ReactNode, type ErrorInfo } from 'react';
import { logger } from '@/utils/logger';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error('error-boundary', `Caught error: ${error.message}`, {
      componentStack: info.componentStack ?? 'N/A',
    });
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.icon}>⚡</span>
            <h2 className={styles.title}>页面发生错误</h2>
            <p className={styles.message}>{this.state.error?.message ?? '未知错误'}</p>
            <button className={styles.retryBtn} onClick={this.handleRetry}>
              重试
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
