import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export interface AdminStore {
  checkAdmin: () => Promise<void>;
  isAdmin: boolean;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,

  checkAdmin: async () => {
    try {
      const { data } = await axiosInstance.get("/admin");
      set({ isAdmin: data.isAdmin });
    } catch (error) {
      console.log(error);
    }
  },
}));
