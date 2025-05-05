import express from "express";
import upload from "../lib/upload.js";
import {
  uploadProductsFromExcel,
  deleteProduct,
  checkAdmin,
  deleteReview,
} from "../controllers/admin.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.use(requireAdmin);

router.delete("/reviews/:id", deleteReview);
router.delete("/products/:id", deleteProduct);

router.get("/", checkAdmin);
router.post("/products", upload.single("file"), uploadProductsFromExcel);

export default router;
