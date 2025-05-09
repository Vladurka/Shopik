import { reviewSchema } from "../validation/validation.js";
import { handleValidationError } from "../utils/handleValidationError.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export const addReview = async (req, res, next) => {
  try {
    const parsed = reviewSchema.parse(req.body);
    const { message, productId, senderId } = parsed;

    const user = await User.findOne({ clerkId: senderId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = await Review.create({
      message,
      productId,
      sender: user._id,
    });

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });

    res.status(200).json({ succeed: true, review });
  } catch (error) {
    const result = handleValidationError(error, res);
    if (!result) next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ succeed: true });
  } catch (error) {
    next(error);
  }
};
