import { create } from 'zustand';
import type { DateRange, ScreenScaleState, TimeRange } from '@/types';

interface UIState {
  // Time filter
  timeRange: TimeRange;
  customDateRange: DateRange | null;

  // Screen adaptation
  screenScale: ScreenScaleState;

  // Actions
  setTimeRange: (range: TimeRange) => void;
  setCustomDateRange: (range: DateRange | null) => void;
  setScreenScale: (scale: ScreenScaleState) => void;
}

export const useUIStore = create<UIState>((set) => ({
  timeRange: 'month',
  customDateRange: null,
  screenScale: { scale: 1, offsetX: 0, offsetY: 0 },

  setTimeRange: (timeRange) => set({ timeRange }),
  setCustomDateRange: (customDateRange) => set({ customDateRange }),
  setScreenScale: (screenScale) => set({ screenScale }),
}));
