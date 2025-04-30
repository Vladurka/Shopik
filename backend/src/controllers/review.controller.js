import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const addReview = async (req, res, next) => {
  try {
    const { message, productId, senderId } = req.body;

    const user = await User.findOne({ clerkId: senderId });

    if (!user) return res.status(404).json({ error: "User not found" });

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
    next(error);
  }
};
