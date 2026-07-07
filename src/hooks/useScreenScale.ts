import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { calculateScale, type ScreenConfig } from '@/utils/screen/scale';

/**
 * Hook that calculates and updates the screen scale whenever
 * the viewport resizes. Stores result in useUIStore.
 */
export function useScreenScale(config?: Partial<ScreenConfig>): void {
  const setScreenScale = useUIStore((s) => s.setScreenScale);

  useEffect(() => {
    const updateScale = () => {
      const state = calculateScale(window.innerWidth, window.innerHeight, config);
      setScreenScale(state);
    };

    // Initial calculation
    updateScale();

    // Debounced resize listener
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(updateScale, 150);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, [config, setScreenScale]);
}
