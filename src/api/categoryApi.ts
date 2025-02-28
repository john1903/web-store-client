import { Category, CategoryRequest } from "@/types/categories/category";
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

const baseUrl = "/categories";

export async function fetchCategories(
  paginationParams?: PaginationParams
): Promise<Result<PagedResponse<Category>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<Category>>(baseUrl, {
      params: paginationParams,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchCategory(
  id: number
): Promise<Result<Category, ApiError>> {
  try {
    const response = await api.get<Category>(`${baseUrl}/${id}`);
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function createCategory(
  categoryRequest: CategoryRequest,
  bearerToken: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(baseUrl, categoryRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateCategory(
  id: number,
  categoryRequest: CategoryRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, categoryRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteCategory(
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
