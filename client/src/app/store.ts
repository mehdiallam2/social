import { IUser } from "@/common/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: null | IUser;
  setUser: (user: IUser) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
      signOut: () => set(() => ({ user: null })),
    }),
    {
      name: "auth",
    }
  )
);
