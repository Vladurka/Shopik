import { stripe } from "../lib/stripe.js";
import { Order } from "../models/order.model.js";
import dotenv from "dotenv";

dotenv.config();

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid request" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart/${req.user.clerkId}`,
      metadata: {
        userId: req.user.clerkId,
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
          }))
        ),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

export const checkoutSuccess = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const products = JSON.parse(session.metadata.products);
      const order = await Order.create({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
        })),
        price: session.amount_total / 100,
        stripeSessionId: session.id,
      });

      return res.status(200).json({
        success: true,
        message: "Order created successfully",
        order: order._id,
      });
    } else {
      return res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error) {
    next(error);
  }
};
