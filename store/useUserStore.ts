import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  session: string | null;
  status: string | null;
  setItemAsync: (
    session: string | null,
    status: string | null
  ) => Promise<void>;
  getItemAsync: () => Promise<string | null>;
  deleteItemAsync: () => Promise<void>;
}

const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      session: null,

      status: null,

      setItemAsync: async (session: string | null, status: string | null) =>
        set({ session, status }),

      getItemAsync: async () => get().session,

      deleteItemAsync: async () => set({ session: null, status: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
