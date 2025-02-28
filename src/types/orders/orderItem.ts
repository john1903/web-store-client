import { Product } from "@/types/products/product";

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderItemRequest {
  id?: number;
  productId: number;
  quantity: number;
}
