import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ParticleBg } from '@/components/ParticleBg';
import { Dashboard } from '@/pages/Dashboard';
import styles from './App.module.css';

export function App() {
  return (
    <ErrorBoundary>
      <ParticleBg />
      <div className={styles.app}>
        <Suspense fallback={<div className={styles.loading}>加载中...</div>}>
          <Dashboard />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
