import express from "express";
import {
  createProduct,
  deleteProduct,
  checkAdmin,
  deleteReview,
} from "../controllers/admin.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", checkAdmin);

router.delete("/reviews/:id", deleteReview);
router.delete("/products/:id", deleteProduct);
router.post("/products", createProduct);

export default router;
