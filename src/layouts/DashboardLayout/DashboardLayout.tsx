import type { ReactNode } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useScreenScale } from '@/hooks/useScreenScale';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  useScreenScale();
  const { scale, offsetX, offsetY } = useUIStore((s) => s.screenScale);

  return (
    <div className={styles.viewport}>
      <div
        className={styles.canvas}
        style={{
          transform: `scale(${scale})`,
          left: `${offsetX}px`,
          top: `${offsetY}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
