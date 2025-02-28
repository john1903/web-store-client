import { Role, RoleRequest } from "@/types/roles/role";
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

const baseUrl = "/roles";

export async function fetchRoles(
  paginationParams?: PaginationParams
): Promise<Result<PagedResponse<Role>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<Role>>(baseUrl, {
      params: paginationParams,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchRole(id: number): Promise<Result<Role, ApiError>> {
  try {
    const response = await api.get<Role>(`${baseUrl}/${id}`);
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function createRole(
  roleRequest: RoleRequest,
  bearerToken: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(baseUrl, roleRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateRole(
  id: number,
  roleRequest: RoleRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, roleRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteRole(
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
