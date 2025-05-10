import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

export const getOrdersByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};
