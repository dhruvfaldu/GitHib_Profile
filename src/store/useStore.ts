// store/useUserStore.js
import { create } from "zustand";
import { User } from "../types/github";

const useUserStore = create((set) => ({
  user: null,
  setUser: (data: User) => set({ user: data }),
}));

export default useUserStore;