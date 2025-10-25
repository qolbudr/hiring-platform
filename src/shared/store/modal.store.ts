import { create } from "zustand";

interface ModalState {
  openModals: string[];
  openModal: (modal: string) => void;
  closeModal: (modal: string) => void;
  closeAllModals: () => void;
  isOpen: (modal: string) => boolean;
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: [],
  openModal: (modal) => {
    const { openModals } = get();
    if (!openModals.includes(modal)) {
      set({ openModals: [...openModals, modal] });
    }
  },
  closeModal: (modal) => {
    set({
      openModals: get().openModals.filter((m) => m !== modal),
    });
  },
  closeAllModals: () => set({ openModals: [] }),
  isOpen: (modal) => get().openModals.includes(modal),
}));
