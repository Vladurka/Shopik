import { Product } from "../models/product.model.js";
import { buildProductQuery } from "../utils/productQueryBuilder.js";

export const getProducts = async (req, res) => {
  try {
    const { filter, sortOption, skip, limit, page } = buildProductQuery(
      req.query
    );

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductFilters = async (req, res) => {
  try {
    const sizes = await Product.distinct("size");
    const colors = await Product.distinct("color");
    const brands = await Product.distinct("brand");
    const categories = await Product.distinct("category");

    res.status(200).json({
      sizes: sizes.filter(Boolean),
      colors: colors.filter(Boolean),
      brands: brands.filter(Boolean),
      categories: categories.filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
