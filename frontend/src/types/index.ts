export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  gender: string;
  tag?: string;
  quantity: number;
  rating?: number;
  reviews?: ReviewOutput[];
}

export interface Filters {
  genders: string[];
  sizes: string[];
  colors: string[];
  brands: string[];
  categories: string[];
}

export interface ReviewOutput {
  _id: string;
  message: string;
  sender: User;
}

export interface ReviewInput {
  message: string;
  productId: string;
  senderId: string;
}

export interface User {
  _id: string;
  fullName: string;
  imageUrl: string;
  clerkId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
