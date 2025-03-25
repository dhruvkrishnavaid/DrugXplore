import { getAuth, signOut, User } from "firebase/auth";
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
        logout: async () => {
          try {
            await signOut(getAuth());
            set({ user: undefined, token: undefined });
          } catch (error) {
            console.error("Failed to sign out: ", error);
          }
        },
      }),
    ),
    { name: "user" },
  ),
);

export default useAuthStore;
