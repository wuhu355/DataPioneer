import { LogLevel, LOG_LEVEL_LABELS, type LoggerConfig } from '@/types/logger';

const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.DEBUG,
  enabledModules: [],
  disabledModules: [],
};

export class Logger {
  private config: LoggerConfig;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
  }

  /** Update configuration */
  setConfig(partial: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...partial };
  }

  /** Get read-only config snapshot */
  getConfig(): Readonly<LoggerConfig> {
    return { ...this.config };
  }

  /** Add a module to the enabled list (only these modules will log) */
  enableModule(module: string): void {
    if (!this.config.enabledModules.includes(module)) {
      this.config.enabledModules = [...this.config.enabledModules, module];
    }
    this.config.disabledModules = this.config.disabledModules.filter((m) => m !== module);
  }

  /** Add a module to the disabled list (silence this module) */
  disableModule(module: string): void {
    if (!this.config.disabledModules.includes(module)) {
      this.config.disabledModules = [...this.config.disabledModules, module];
    }
    this.config.enabledModules = this.config.enabledModules.filter((m) => m !== module);
  }

  /** Reset all module filters */
  resetModules(): void {
    this.config.enabledModules = [];
    this.config.disabledModules = [];
  }

  // ---- Logging methods ----

  debug(module: string, message: string, ...args: unknown[]): void {
    this.log(LogLevel.DEBUG, module, message, args);
  }

  info(module: string, message: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, module, message, args);
  }

  warn(module: string, message: string, ...args: unknown[]): void {
    this.log(LogLevel.WARN, module, message, args);
  }

  error(module: string, message: string, ...args: unknown[]): void {
    this.log(LogLevel.ERROR, module, message, args);
  }

  // ---- Internal ----

  private log(level: LogLevel, module: string, message: string, args: unknown[]): void {
    if (!this.shouldLog(module, level)) return;

    const timestamp = this.timestamp();
    const label = LOG_LEVEL_LABELS[level];
    const prefix = `[${timestamp}] [${label}] [${module}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, ...args);
        break;
      case LogLevel.INFO:
        console.info(prefix, message, ...args);
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, ...args);
        break;
      case LogLevel.ERROR:
        console.error(prefix, message, ...args);
        break;
    }
  }

  private shouldLog(module: string, level: LogLevel): boolean {
    // Level filtering
    if (level < this.config.level) return false;

    // Module blacklist takes priority
    if (this.config.disabledModules.includes(module)) return false;

    // Module whitelist (empty = all modules allowed)
    if (this.config.enabledModules.length > 0 && !this.config.enabledModules.includes(module)) {
      return false;
    }

    return true;
  }

  private timestamp(): string {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
}
