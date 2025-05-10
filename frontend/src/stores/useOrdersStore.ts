import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { Order } from "@/types";

export interface OrdersStore {
  orders: Order[];
  error: string | null;
  getMyOrders: (id: string) => Promise<void>;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  error: null,

  getMyOrders: async (id) => {
    try {
      const { data } = await axiosInstance.get(`/orders/user/${id}`);
      set({ orders: data.orders });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
