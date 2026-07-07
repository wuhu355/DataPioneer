import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  /** Animation duration in ms */
  duration?: number;
  /** Start counting from this value */
  from?: number;
}

/**
 * Hook that animates a number from `from` to `target` over `duration` ms.
 * Uses easeOutExpo easing for a natural deceleration.
 */
export function useCountUp(target: number, options: UseCountUpOptions = {}): number {
  const { duration = 1500, from = 0 } = options;
  const [current, setCurrent] = useState(from);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset for new target
    startTimeRef.current = null;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCurrent(from + (target - from) * easedProgress);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, from, duration]);

  return current;
}
