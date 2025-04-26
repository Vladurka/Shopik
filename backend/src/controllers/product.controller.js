import { Product } from "../models/product.model.js";
import { buildProductQuery } from "../utils/productQueryBuilder.js";

export const getProducts = async (req, res, next) => {
  try {
    const { filter, sortOption, skip, limit, page } = buildProductQuery(
      req.query
    );

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
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

export const getProductFilters = async (req, res, next) => {
  try {
    const sizes = await Product.distinct("size");
    const colors = await Product.distinct("color");
    const brands = await Product.distinct("brand");
    const categories = await Product.distinct("category");
    const ganders = await Product.distinct("gender");

    res.status(200).json({
      filters: {
        sizes: sizes.filter(Boolean).sort(),
        colors: colors.filter(Boolean).sort(),
        brands: brands.filter(Boolean).sort(),
        categories: categories.filter(Boolean).sort(),
        genders: ganders.filter(Boolean).sort(),
      },
    });
  } catch (error) {
    next(error);
  }
};
