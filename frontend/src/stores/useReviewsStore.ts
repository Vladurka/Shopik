import { ReviewInput } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export interface ReviewStore {
  error: string | null;
  addReview: (review: ReviewInput) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  error: null,

  addReview: async (review: ReviewInput) => {
    set({ error: null });

    try {
      await axiosInstance.post("/reviews", review);
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add review",
      });
    }
  },
}));
