import express from "express";
import {
  createProduct,
  deleteReview,
  deleteProduct,
  checkAdmin,
} from "../controllers/admin.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", checkAdmin);

router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.delete("/reviews/:id", deleteReview);

export default router;
