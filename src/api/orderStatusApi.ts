import {
  OrderStatus,
  OrderStatusRequest,
} from "@/types/orderstatuses/orderStatus";
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

const baseUrl = "/order-statuses";

export async function fetchOrderStatuses(
  paginationParams?: PaginationParams
): Promise<Result<PagedResponse<OrderStatus>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<OrderStatus>>(baseUrl, {
      params: paginationParams,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchOrderStatus(
  id: number
): Promise<Result<OrderStatus, ApiError>> {
  try {
    const response = await api.get<OrderStatus>(`${baseUrl}/${id}`);
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function createOrderStatus(
  orderStatusRequest: OrderStatusRequest,
  bearerToken: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(baseUrl, orderStatusRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateOrderStatus(
  id: number,
  orderStatusRequest: OrderStatusRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, orderStatusRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteOrderStatus(
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
