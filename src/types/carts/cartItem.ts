import { Product } from "@/types/products/product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartItemRequest {
  id?: number;
  productId: number;
  quantity: number;
}
