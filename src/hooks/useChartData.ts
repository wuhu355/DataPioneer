import { useState, useEffect, useCallback, useRef } from 'react';
import type { AsyncState } from '@/types/common';
import { logger } from '@/utils/logger';

interface UseChartDataOptions {
  /** Whether to fetch immediately on mount */
  immediate?: boolean;
}

/**
 * Generic hook for async data fetching with loading/error state.
 * Supports abort on unmount and manual refetch.
 */
export function useChartData<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  options: UseChartDataOptions = {},
): AsyncState<T> & { refetch: () => void } {
  const { immediate = true } = options;
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });
  const controllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(() => {
    // Abort any in-flight request
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          const message = err instanceof Error ? err.message : String(err);
          logger.error('useChartData', `Fetch failed: ${message}`);
          setState({ data: null, loading: false, error: message });
        }
      });
  }, [fetcher]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    return () => {
      controllerRef.current?.abort();
    };
  }, [immediate, execute]);

  return { ...state, refetch: execute };
}
