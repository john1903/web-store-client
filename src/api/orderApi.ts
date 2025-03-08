import {
  Order,
  OrderRequest,
  ChangeOrderStatusRequest,
} from "@/types/orders/order";
import { OrderFilters } from "@/types/orders/orderFilters";
import { RatingRequest } from "@/types/orders/rating";
import {
  PaginationParams,
  Result,
  IdResponse,
  PagedResponse,
  ApiError,
  BearerToken,
  api,
  getAuthHeaders,
  handleError,
} from "@/common/commonImports";

const baseUrl = "/orders";

export async function fetchOrders(
  bearerToken: BearerToken,
  paginationParams?: PaginationParams,
  filters?: OrderFilters
): Promise<Result<PagedResponse<Order>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<Order>>(baseUrl, {
      params: { ...paginationParams, ...filters },
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchOrderCurrentUser(
  bearerToken: BearerToken,
  paginationParams?: PaginationParams,
  filters?: OrderFilters
): Promise<Result<PagedResponse<Order>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<Order>>(
      `${baseUrl}/current-user`,
      {
        params: { ...paginationParams, ...filters },
        headers: getAuthHeaders(bearerToken),
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchOrder(
  id: number,
  bearerToken: BearerToken
): Promise<Result<Order, ApiError>> {
  try {
    const response = await api.get<Order>(`${baseUrl}/${id}`, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function createOrder(
  orderRequest: OrderRequest,
  bearerToken?: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(
      baseUrl,
      orderRequest,
      bearerToken
        ? {
            headers: getAuthHeaders(bearerToken),
          }
        : undefined
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateOrder(
  id: number,
  orderRequest: OrderRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, orderRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateOrderStatus(
  id: number,
  changeOrderStatusRequest: ChangeOrderStatusRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}/status`, changeOrderStatusRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function addRating(
  id: number,
  ratingRequest: RatingRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.post(`${baseUrl}/${id}/rating`, ratingRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteOrder(
  id: number,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.delete(`${baseUrl}/${id}`, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}
