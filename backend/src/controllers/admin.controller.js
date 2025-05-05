import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import * as XLSX from "xlsx";

export const uploadProductsFromExcel = async (req, res, error) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "File is required" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const products = data.map((item, index) => {
      if (!item.name || !item.price || !item.imageUrl || !item.description) {
        throw new Error(`Not enough data in row ${index + 2}`);
      }

      return {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        category: item.category,
        brand: item.brand,
        color: item.color,
        size: item.size,
        gender: item.gender,
        tag: item.tag || "",
        quantity: item.quantity,
        rating: item.rating || 0,
      };
    });

    await Product.insertMany(products);
    res.status(200).json({ message: "Products uploaded" });
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
