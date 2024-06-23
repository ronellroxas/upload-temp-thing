import { create } from "zustand";

interface TooltipStoreState {
    tooltip: string | null,
    setTooltip: (tooltip: string) => void,
    clearTooltip: () => void
}

export const useTooltipStore = create<TooltipStoreState>((set) => ({
    tooltip: null,
    setTooltip: (tooltip: string) => set(() => ({tooltip: tooltip})),
    clearTooltip: () => set(() => ({ tooltip: null }))
}));