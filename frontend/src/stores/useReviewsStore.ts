import { ReviewInput } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export interface ReviewStore {
  error: string | null;
  addReview: (review: ReviewInput) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  error: null,

  addReview: async (review: ReviewInput) => {
    set({ error: null });
    try {
      await axiosInstance.post("/reviews", review);
      toast.success("Review added successfully");
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add review",
      });
      toast.error("Failed to add review");
    }
  },
  deleteReview: async (id: string) => {
    set({ error: null });
    try {
      await axiosInstance.delete(`admin/reviews/${id}`);
      toast.success("Review deleted successfully");
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete review",
      });
      toast.error("Failed to delete review");
    }
  },
}));
