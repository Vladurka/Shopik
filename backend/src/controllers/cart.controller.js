import { redis } from "../lib/redis.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { id, productId } = req.body;
    const quantity = 1;

    const product = await Product.findById(productId).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartKey = `cart:${id}`;
    const cartRaw = await redis.get(cartKey);
    let cart = cartRaw ? JSON.parse(cartRaw) : [];

    const existingItem = cart.find(
      (item) => item.product._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity });
    }

    await redis.set(cartKey, JSON.stringify(cart));
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartKey = `cart:${id}`;
    const cartRaw = await redis.get(cartKey);

    const cart = cartRaw ? JSON.parse(cartRaw) : [];
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id, productId } = req.body;
    const cartKey = `cart:${id}`;
    const cartRaw = await redis.get(cartKey);

    if (!cartRaw) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let cart = JSON.parse(cartRaw);
    const itemIndex = cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (cart[itemIndex].quantity <= 1) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity -= 1;
    }

    await redis.set(cartKey, JSON.stringify(cart));
    res.status(200).json({ message: "Product updated", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { id } = req.params;
    await redis.del(`cart:${id}`);
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
