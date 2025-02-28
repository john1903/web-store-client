import { Cart, CartRequest } from "@/types/carts/cart";
import { CartItemRequest } from "@/types/carts/cartItem";
import {
  Result,
  ApiError,
  BearerToken,
  api,
  getAuthHeaders,
  handleError,
} from "@/common/commonImports";

const baseUrl = "/carts";

export async function fetchCart(
  bearerToken: BearerToken
): Promise<Result<Cart, ApiError>> {
  try {
    const response = await api.get<Cart>(`${baseUrl}/current`, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateCart(
  cartRequest: CartRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/current`, cartRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function addCartItem(
  cartItemRequest: CartItemRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    const response = await api.post(
      `${baseUrl}/current/items`,
      cartItemRequest,
      {
        headers: getAuthHeaders(bearerToken),
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function emptyCart(
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.delete(`${baseUrl}/current/items`, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}
