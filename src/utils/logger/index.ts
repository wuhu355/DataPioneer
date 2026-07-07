import { Logger } from './Logger';
import { LogLevel, logLevelFromString } from '@/types/logger';

/** Global logger singleton */
export const logger = new Logger();

/** Initialize logger from environment config */
export function initLogger(): void {
  const envLevel = import.meta.env.VITE_LOG_LEVEL;
  if (envLevel) {
    logger.setConfig({ level: logLevelFromString(envLevel) });
  }
  logger.info('logger', `Logger initialized at level: ${LogLevel[logger.getConfig().level]}`);
}

export { Logger, LogLevel };
