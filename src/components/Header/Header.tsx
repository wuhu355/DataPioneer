import { useState, useEffect, useCallback } from 'react';
import { formatDate } from '@/utils/formatters';
import styles from './Header.module.css';

const DAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = 'DataPioneer 数据先锋大屏',
  subtitle = 'Data Visualization Dashboard',
}: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <header className={styles.header}>
      {/* Left */}
      <div className={styles.left}>
        <button className={styles.fsBtn} onClick={toggleFullscreen} title="全屏切换">
          {isFullscreen ? '⊠' : '⊞'}
        </button>
      </div>

      {/* Center */}
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Right */}
      <div className={styles.right}>
        <span className={styles.clockTime}>{formatDate(time, 'HH:mm:ss')}</span>
        <span className={styles.clockDate}>
          {formatDate(time, 'YYYY-MM-DD')} {DAY_NAMES[time.getDay()]}
        </span>
      </div>
    </header>
  );
}
