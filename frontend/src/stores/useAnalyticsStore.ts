import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface DailySalesEntry {
  date: string;
  sales: number;
  revenue: number;
}

interface AnalyticsStore {
  users: number;
  products: number;
  sales: number;
  revenue: number;
  dailySales: DailySalesEntry[];
  isLoading: boolean;
  error: string | null;
  getAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  users: 0,
  products: 0,
  sales: 0,
  revenue: 0,
  dailySales: [],
  isLoading: false,
  error: null,

  getAnalytics: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axiosInstance.get("/analytics");

      set({
        users: data.analyticsData.users,
        products: data.analyticsData.products,
        sales: data.analyticsData.sales,
        revenue: data.analyticsData.revenue,
        dailySales: data.dailySalesData,
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to load analytics data." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
