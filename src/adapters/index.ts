import type { IDataAdapter } from './types';
import { MockAdapter } from './mock';
import { ApiAdapter } from './api';
import { logger } from '@/utils/logger';

export type AdapterMode = 'mock' | 'api';

/**
 * Create a data adapter based on the VITE_DATA_SOURCE environment variable.
 *
 * - `mock` (default): Returns MockAdapter with realistic generated data
 * - `api`: Returns ApiAdapter (stub — implement actual fetch calls)
 *
 * Switching modes requires zero code changes outside this factory.
 */
export function createDataAdapter(): IDataAdapter {
  const mode: AdapterMode = (import.meta.env.VITE_DATA_SOURCE as AdapterMode) ?? 'mock';

  logger.info('adapter', `Data source mode: ${mode}`);

  switch (mode) {
    case 'api':
      logger.warn('adapter', 'API mode selected — endpoints are not yet implemented');
      return new ApiAdapter();
    case 'mock':
    default:
      return new MockAdapter();
  }
}

export type { IDataAdapter } from './types';
