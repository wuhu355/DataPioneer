import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Logger } from '@/utils/logger/Logger';
import { LogLevel } from '@/types/logger';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
  });

  it('should output debug messages when level is DEBUG', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    logger.setConfig({ level: LogLevel.DEBUG });
    logger.debug('test', 'hello');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should suppress debug messages when level is INFO', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    logger.setConfig({ level: LogLevel.INFO });
    logger.debug('test', 'hello');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should suppress debug and info when level is WARN', () => {
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.setConfig({ level: LogLevel.WARN });
    logger.debug('test', 'debug');
    logger.info('test', 'info');
    expect(debugSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    debugSpy.mockRestore();
    infoSpy.mockRestore();
  });

  it('should output error messages when level is WARN or below', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // ERROR level is >= WARN, so it should log when config level is WARN
    logger.setConfig({ level: LogLevel.WARN });
    logger.error('test', 'fatal');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should filter by enabled modules', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.setConfig({ level: LogLevel.DEBUG, enabledModules: ['auth'], disabledModules: [] });
    logger.info('auth', 'should log');
    logger.info('other', 'should not log');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('should disable specific modules', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.setConfig({ level: LogLevel.DEBUG, enabledModules: [], disabledModules: ['noisy'] });
    logger.info('noisy', 'should not log');
    logger.info('quiet', 'should log');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
