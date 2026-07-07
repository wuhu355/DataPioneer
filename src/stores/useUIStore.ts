import { create } from 'zustand';
import type { DateRange, ScreenScaleState, TimeRange } from '@/types';

interface UIState {
  // Time filter
  timeRange: TimeRange;
  customDateRange: DateRange | null;

  // Screen adaptation
  screenScale: ScreenScaleState;

  // Focused panel (only one at a time)
  focusedPanel: string | null;

  // Actions
  setTimeRange: (range: TimeRange) => void;
  setCustomDateRange: (range: DateRange | null) => void;
  setScreenScale: (scale: ScreenScaleState) => void;
  toggleFocusedPanel: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  timeRange: 'month',
  customDateRange: null,
  screenScale: { scale: 1, offsetX: 0, offsetY: 0 },
  focusedPanel: null,

  setTimeRange: (timeRange) => set({ timeRange }),
  setCustomDateRange: (customDateRange) => set({ customDateRange }),
  setScreenScale: (screenScale) => set({ screenScale }),
  toggleFocusedPanel: (id) =>
    set((s) => ({ focusedPanel: s.focusedPanel === id ? null : id })),
}));
