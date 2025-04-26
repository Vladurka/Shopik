import express from "express";
import {
  getProducts,
  getProductById,
  getProductFilters,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/filters", getProductFilters);
router.get("/:id", getProductById);

export default router;
