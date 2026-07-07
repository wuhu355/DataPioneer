import { describe, it, expect } from 'vitest';
import { calculateScale, DEFAULT_SCREEN_CONFIG } from '@/utils/screen/scale';

describe('calculateScale', () => {
  it('should return scale 1 when viewport matches design size', () => {
    const result = calculateScale(1920, 1080);
    expect(result.scale).toBeCloseTo(1.0);
    expect(result.offsetX).toBe(0);
    expect(result.offsetY).toBe(0);
  });

  it('should scale down proportionally for smaller viewport', () => {
    // 1366x768 — common laptop resolution
    const result = calculateScale(1366, 768);
    expect(result.scale).toBeLessThan(1);
    expect(result.scale).toBeGreaterThan(0.5);
  });

  it('should scale up proportionally for larger viewport', () => {
    const result = calculateScale(3840, 2160);
    expect(result.scale).toBeGreaterThan(1);
  });

  it('should respect minScale', () => {
    const result = calculateScale(100, 100, { minScale: 0.5 });
    expect(result.scale).toBe(0.5);
  });

  it('should respect maxScale', () => {
    const result = calculateScale(10000, 10000, { maxScale: 1.5 });
    expect(result.scale).toBe(1.5);
  });

  it('should center the content with offsets', () => {
    const result = calculateScale(960, 540); // half of design
    expect(result.scale).toBeCloseTo(0.5);
    // Offsets should center the scaled-down content
    expect(result.offsetX).toBeGreaterThanOrEqual(0);
    expect(result.offsetY).toBeGreaterThanOrEqual(0);
  });

  it('should use default config when none provided', () => {
    const result = calculateScale(1920, 1080);
    expect(result.scale).toBe(1.0);
    // Verify defaults are applied
    expect(DEFAULT_SCREEN_CONFIG.designWidth).toBe(1920);
    expect(DEFAULT_SCREEN_CONFIG.designHeight).toBe(1080);
  });
});
