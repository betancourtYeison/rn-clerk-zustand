import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Toast from "react-native-root-toast";

import { ConfigToast } from "@/constants/ConfigToast";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (err) {
        const error = err as Error;
        Toast.show(error.message, ConfigToast);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
