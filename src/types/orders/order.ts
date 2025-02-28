import { Rating } from "@/types/orders/rating";
import { OrderStatus } from "@/types/orderstatuses/orderStatus";
import { OrderItem } from "@/types/orders/orderItem";
import { User } from "@/types/users/user";
import { OrderItemRequest } from "@/types/orders/orderItem";

export interface Order {
  id: number;
  orderDate: Date;
  statusChangeDate: Date;
  customer: User;
  status: OrderStatus;
  rating: Rating;
  items: OrderItem[];
  total: number;
}

export interface OrderRequest {
  customerId: number;
  items: OrderItemRequest[];
}

export interface ChangeOrderStatusRequest {
  orderStatusId: number;
}
