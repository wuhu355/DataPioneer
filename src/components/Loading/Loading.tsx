import styles from './Loading.module.css';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = '加载中...', fullScreen = false }: LoadingProps) {
  return (
    <div className={`${styles.loading} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.spinner}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
