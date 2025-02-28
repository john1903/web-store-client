import { Product, ProductRequest } from "@/types/products/product";
import { ProductFilters } from "@/types/products/productFilters";
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

const baseUrl = "/products";

export async function fetchProducts(
  paginationParams?: PaginationParams,
  filters?: ProductFilters
): Promise<Result<PagedResponse<Product>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<Product>>(baseUrl, {
      params: { ...paginationParams, ...filters },
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchProduct(
  id: number
): Promise<Result<Product, ApiError>> {
  try {
    const response = await api.get<Product>(`${baseUrl}/${id}`);
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function createProduct(
  productRequest: ProductRequest,
  bearerToken: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(baseUrl, productRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateProduct(
  id: number,
  productRequest: ProductRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, productRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteProduct(
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
