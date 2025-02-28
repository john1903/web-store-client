import { CartItem, CartItemRequest } from "@/types/carts/cartItem";

export interface Cart {
  id: number;
  customerId: number;
  items: CartItem[];
  total: number;
}

export interface CartRequest {
  items: CartItemRequest[];
}
