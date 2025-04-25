import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export const Song = mongoose.model("Review", reviewSchema);
