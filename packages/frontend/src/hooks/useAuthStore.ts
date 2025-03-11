import { User } from "firebase/auth";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    combine(
      {
        user: undefined as undefined | User,
        token: undefined as undefined | string,
      },
      (set) => ({
        setUser: (user: User) => set({ user }),
        setToken: (token: string | undefined) => set({ token }),
        logout: () => set({ user: undefined, token: undefined }),
      }),
    ),
    { name: "user" },
  ),
);

export default useAuthStore;
