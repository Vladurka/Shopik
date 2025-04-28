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
  reviews?: string[];
}

export interface Filters {
  genders: string[];
  sizes: string[];
  colors: string[];
  brands: string[];
  categories: string[];
}
