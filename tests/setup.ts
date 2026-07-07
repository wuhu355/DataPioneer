import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock ResizeObserver (not available in jsdom)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock HTMLCanvasElement.getContext for ECharts (jsdom doesn't support Canvas)
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  canvas: null,
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
  putImageData: vi.fn(),
  createImageData: vi.fn(() => []),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  fillText: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  translate: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  measureText: vi.fn(() => ({ width: 10 })),
  transform: vi.fn(),
  rect: vi.fn(),
  clip: vi.fn(),
} as unknown as CanvasRenderingContext2D);

// Suppress console during tests (logger uses console under the hood)
// Uncomment if needed:
// vi.spyOn(console, 'debug').mockImplementation(() => {});
// vi.spyOn(console, 'info').mockImplementation(() => {});
// vi.spyOn(console, 'warn').mockImplementation(() => {});
// vi.spyOn(console, 'error').mockImplementation(() => {});
