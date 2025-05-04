import express from "express";
import {
  createCheckoutSession,
  checkoutSuccess,
} from "../controllers/payment.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);

export default router;
