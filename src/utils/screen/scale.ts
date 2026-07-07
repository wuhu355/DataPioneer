import type { ScreenScaleState } from '@/types/layout';

export interface ScreenConfig {
  designWidth: number;
  designHeight: number;
  minScale: number;
  maxScale: number;
}

export const DEFAULT_SCREEN_CONFIG: ScreenConfig = {
  designWidth: 1920,
  designHeight: 1080,
  minScale: 0.3,
  maxScale: 2.0,
};

/**
 * Calculate the optimal scale factor and offsets to fit a fixed-size
 * dashboard into the current viewport, maintaining aspect ratio.
 */
export function calculateScale(
  containerWidth: number,
  containerHeight: number,
  config: Partial<ScreenConfig> = {},
): ScreenScaleState {
  const { designWidth, designHeight, minScale, maxScale } = {
    ...DEFAULT_SCREEN_CONFIG,
    ...config,
  };

  const scaleX = containerWidth / designWidth;
  const scaleY = containerHeight / designHeight;

  // Fit without cropping (letterbox)
  let scale = Math.min(scaleX, scaleY);

  // Clamp within bounds
  scale = Math.max(minScale, Math.min(maxScale, scale));

  // Center the scaled content
  const offsetX = (containerWidth - designWidth * scale) / 2;
  const offsetY = (containerHeight - designHeight * scale) / 2;

  return { scale, offsetX, offsetY };
}
