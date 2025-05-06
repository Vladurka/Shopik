import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1).max(50),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  description: z.string().min(1).max(500),
  category: z.string().min(1).max(50),
  brand: z.string().min(1).max(50),
  color: z.string().min(1).max(50),
  size: z.string().min(1).max(50),
  gender: z.string().min(1).max(50),
  tag: z.string().min(1).max(50).optional(),
  quantity: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).optional(),
});

export const cartSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
});

export const reviewSchema = z.object({
  message: z.string().min(1).max(52),
  productId: z.string().min(1),
  senderId: z.string().min(1),
});

export const userSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  imageUrl: z.string().url(),
});
