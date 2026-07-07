import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/formatters';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = 'DataPioneer 数据先锋大屏',
  subtitle = 'Data Visualization Dashboard',
}: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoDot} />
          </div>
        </div>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <div className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.clock}>
          <span className={styles.clockTime}>{formatDate(time, 'HH:mm:ss')}</span>
          <span className={styles.clockDate}>{formatDate(time, 'YYYY-MM-DD')}</span>
        </div>
      </div>
    </header>
  );
}
