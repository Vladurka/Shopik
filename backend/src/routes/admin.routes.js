import express from "express";
import upload from "../lib/upload.js";
import {
  uploadProductsFromExcel,
  deleteProduct,
  checkAdmin,
  setQuantity,
} from "../controllers/admin.controller.js";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute, requireAdmin);

router.delete("/products/:id", deleteProduct);

router.get("/", checkAdmin);

router.post("/products", upload.single("file"), uploadProductsFromExcel);

router.patch("/products/setQuantity", setQuantity);

export default router;
