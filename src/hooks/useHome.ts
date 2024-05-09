import { create } from 'zustand';

interface HomeStore {
  isHomeOpen: boolean;
  onHomeOpen: () => void;
  onHomeClose: () => void;
}

const useHomeStatus = create<HomeStore>((set) => ({
  isHomeOpen: true,
  onHomeOpen: () => set({ isHomeOpen: true }),
  onHomeClose: () => set({ isHomeOpen: false }),
}));

export default useHomeStatus;