import { create } from 'zustand';

interface GuideStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useGuide = create<GuideStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGuide;