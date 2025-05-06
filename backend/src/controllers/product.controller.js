import { Product } from "../models/product.model.js";
import { buildProductQuery } from "../utils/productQueryBuilder.js";

export const getProducts = async (req, res, next) => {
  try {
    const { filter, sortOption, skip, limit } = buildProductQuery(req.query);

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
    const product = await Product.findById(req.params.id).populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "sender",
        model: "User",
      },
    });

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
    const { filter } = buildProductQuery(req.query);

    const sizes = await Product.distinct("size", filter);
    const colors = await Product.distinct("color", filter);
    const brands = await Product.distinct("brand", filter);
    const categories = await Product.distinct("category", filter);
    const genders = await Product.distinct("gender", filter);

    res.status(200).json({
      filters: {
        sizes: sizes.filter(Boolean).sort(),
        colors: colors.filter(Boolean).sort(),
        brands: brands.filter(Boolean).sort(),
        categories: categories.filter(Boolean).sort(),
        genders: genders.filter(Boolean).sort(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const checkQuantity = async (productId, quantity) => {
  const product = await Product.findById(productId).lean();
  return product.quantity >= quantity;
};
