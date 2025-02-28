import { Category } from "@/types/categories/category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: Category;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  weight?: number;
  categoryId: number;
}
