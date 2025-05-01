import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", getCart);
router.post("/", addToCart);
router.patch("/", removeFromCart);
router.delete("/:id", clearCart);

export default router;
