import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
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
