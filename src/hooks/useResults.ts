import { create } from 'zustand';

interface GameStatusStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useGameStatus = create<GameStatusStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useGameStatus;