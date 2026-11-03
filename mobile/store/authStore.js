import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    token: null,

    login: async (email, password) => {
        const response = await api.post("/login", {
            email,
            password,
        });

        const { user, token } = response.data;

    await SecureStore.setItemAsync("token", token);

    set({
      user: user,
      token: token,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");

    set({
      user: null,
      token: null,
    });
  }, 
}));

export default useAuthStore;