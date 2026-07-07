// ===== Log Level =====
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.NONE]: 'NONE',
};

export type LogLevelName = 'debug' | 'info' | 'warn' | 'error';

// ===== Logger Config =====
export interface LoggerConfig {
  level: LogLevel;
  enabledModules: string[];
  disabledModules: string[];
}

/** Map string from env to LogLevel */
export function logLevelFromString(value: string): LogLevel {
  switch (value.toLowerCase()) {
    case 'debug':
      return LogLevel.DEBUG;
    case 'info':
      return LogLevel.INFO;
    case 'warn':
      return LogLevel.WARN;
    case 'error':
      return LogLevel.ERROR;
    default:
      return LogLevel.DEBUG;
  }
}
