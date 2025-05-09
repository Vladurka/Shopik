import express from "express";
import { addReview, deleteReview } from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.delete("/:id", deleteReview);
router.post("/", addReview);

export default router;
