import { create } from 'zustand';

interface FileStoreState {
    files: File[],
    totalSpace: number,
    push: (file: File) => void,
    remove: (file: File) => void,
    clear: () => void
}

/**
 * State store for selected files.
 */
export const useFileStore = create<FileStoreState>((set) => ({
    files: [],
    totalSpace: 0,
    push: (file: File) => set((state) => ({ 
        files: [...state.files, file], 
        totalSpace: state.totalSpace + file.size
    })),
    remove: (file: File) => set((state) => ({
        files: state.files.filter((it) => it != file),
        totalSpace: Math.abs(state.totalSpace-file.size)
    })),
    clear: () => set((state) => ({files: []}))
}));