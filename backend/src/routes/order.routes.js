import { Router } from "express";
import { getOrdersByUser } from "../controllers/order.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/user/:id", getOrdersByUser);

export default router;
