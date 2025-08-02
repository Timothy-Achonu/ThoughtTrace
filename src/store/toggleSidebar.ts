import { create } from "zustand";

interface State {
  // Your state properties go here
  showSidebar: boolean;
toggleSidebar: () => void;
}

const useToggleSidebar = create<State>((set) => ({
  // Your state initial values go here
  showSidebar: false,
  toggleSidebar() {
    set((state) => ({
      ...state,
      showSidebar: !state.showSidebar,
    }));
  },

}));

export default useToggleSidebar;
