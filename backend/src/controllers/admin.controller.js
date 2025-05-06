import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { mapProduct } from "../mapping/mapper.js";
import * as XLSX from "xlsx";
import { productSchema } from "../validation/validation.js";

export const uploadProductsFromExcel = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "File is required" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const products = [];
    const errors = [];

    data.forEach((item, index) => {
      try {
        const parsed = productSchema.parse(item);
        products.push(mapProduct(parsed));
      } catch (validationError) {
        const message =
          validationError.errors?.[0]?.message || "Validation error";
        errors.push(`Row ${index + 2}: ${message}`);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    await Product.insertMany(products);
    res.status(200).json({ message: "Products uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ succeed: true });
  } catch (error) {
    next(error);
  }
};

export const checkAdmin = async (req, res) => {
  res.status(200).json({ isAdmin: true });
};
