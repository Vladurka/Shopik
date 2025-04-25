import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  checkAdmin,
} from "../controllers/admin.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdmin);

router.get("/", checkAdmin);

router.post("/products", createProduct);
router.get("/products/:id", updateProduct);
router.get("/products/filters", deleteProduct);

export default router;
