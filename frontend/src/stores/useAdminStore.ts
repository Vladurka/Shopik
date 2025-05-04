import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
export interface AdminStore {
  isAdmin: boolean;
  checkAdmin: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,

  checkAdmin: async () => {
    try {
      const { data } = await axiosInstance.get("/admin");
      set({ isAdmin: data.isAdmin });
    } catch (error: any) {
      console.log(error);
    }
  },
}));
