import express from "express";
import {
  getProducts,
  getProductById,
  getProductFilters,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/filters", getProductFilters);

export default router;
