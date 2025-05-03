import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  isAdded,
} from "../controllers/cart.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/isAdded/:id/:productId", isAdded);
router.get("/:id", getCart);
router.post("/", addToCart);
router.patch("/", removeFromCart);
router.delete("/:id", clearCart);

export default router;
