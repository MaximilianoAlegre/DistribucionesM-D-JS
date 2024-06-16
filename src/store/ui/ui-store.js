import { create } from "zustand";

const useUIStore = create((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSidemenu: () => set({ isSideMenuOpen: false }),
}));

export default useUIStore;
