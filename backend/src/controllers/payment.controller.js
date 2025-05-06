import { stripe } from "../lib/stripe.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { checkQuantity } from "../controllers/product.controller.js";
import dotenv from "dotenv";

dotenv.config();

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products, clerkId } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid request" });
    }

    let totalAmount = 0;
    const lineItems = [];

    for (const item of products) {
      const unitAmount = Math.round(item.product.price * 100);
      const quantity = item.quantity;

      const isEnough = await checkQuantity(item.product._id, quantity);
      if (!isEnough) {
        return res.status(400).json({ message: "Not enough quantity" });
      }

      if (isNaN(unitAmount) || isNaN(quantity)) {
        return res
          .status(400)
          .json({ message: "Invalid price or quantity in product" });
      }

      totalAmount += unitAmount * quantity;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            images: [item.product.imageUrl],
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart/${clerkId}`,
      metadata: {
        userId: clerkId,
        products: JSON.stringify(
          products.map((item) => ({
            id: item.product._id,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    next(error);
  }
};

export const checkoutSuccess = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    if (
      !sessionId ||
      typeof sessionId !== "string" ||
      sessionId.trim() === ""
    ) {
      return res.status(400).json({ message: "Invalid or missing sessionId" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const clerkId = session.metadata.userId;
    const products = JSON.parse(session.metadata.products);

    const dbUser = await User.findOne({ clerkId });

    if (!dbUser) {
      return res.status(404).json({ error: "User not found in MongoDB" });
    }

    const order = await Order.create({
      user: dbUser._id,
      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
      })),
      price: session.amount_total / 100,
      stripeSessionId: session.id,
    });

    for (let i = 0; i < products.length; i++) {
      await Product.findByIdAndUpdate(products[i].id, {
        $inc: { quantity: -products[i].quantity },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: order._id,
    });
  } catch (error) {
    next(error);
  }
};
