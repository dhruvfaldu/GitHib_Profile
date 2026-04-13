
import { create } from "zustand";
import { User } from "../types/github";

interface UserStore {
    user: User | null;
    setUser: (data: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
}));

export default useUserStore;