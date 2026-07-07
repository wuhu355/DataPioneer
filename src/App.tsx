import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Dashboard } from '@/pages/Dashboard';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <Suspense fallback={<div className={styles.loading}>加载中...</div>}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
