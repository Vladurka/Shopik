import express from "express";
import { addReview } from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addReview);

export default router;
