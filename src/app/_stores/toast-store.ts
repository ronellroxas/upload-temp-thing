import { create } from "zustand"

export enum ToastType {
    INFO,
    ERROR,
    SUCCESS
}

export interface ToastItem {
    message: string,
    type: ToastType,
    showTitle: boolean
}

interface ToastStoreState {
    queue: ToastItem[],
    push: (item: ToastItem) => void
}

const TEST_DATA: ToastItem[] = [
    { message: "Test 1", type: ToastType.ERROR, showTitle: true },
    { message: "Test 2", type: ToastType.INFO, showTitle: true  },
    { message: "Test 3", type: ToastType.SUCCESS, showTitle: true  },
    { message: "Some long message lorem ipsum joe doe sometihing sometihing sometihing sometihing ", type: ToastType.INFO, showTitle: true },
] 

export const useToastStore = create<ToastStoreState>((set) => ({
    queue: TEST_DATA,
    push: (item: ToastItem) => set((state) => ({ queue: [...state.queue, item]}))
}));