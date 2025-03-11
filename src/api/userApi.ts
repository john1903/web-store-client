import {
  User,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "@/types/users/user";
import {
  PaginationParams,
  Result,
  PagedResponse,
  ApiError,
  BearerToken,
  api,
  getAuthHeaders,
  handleError,
} from "@/common/commonImports";

const baseUrl = "/users";

export async function fetchUsers(
  bearerToken: BearerToken,
  paginationParams?: PaginationParams
): Promise<Result<PagedResponse<User>, ApiError>> {
  try {
    const response = await api.get<PagedResponse<User>>(baseUrl, {
      params: paginationParams,
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchUser(
  id: number,
  bearerToken: BearerToken
): Promise<Result<User, ApiError>> {
  try {
    const response = await api.get<User>(`${baseUrl}/${id}`, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updateUser(
  id: number,
  userRequest: UpdateUserRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}`, userRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function changePassword(
  id: number,
  changePasswordRequest: ChangePasswordRequest,
  bearerToken: BearerToken
): Promise<Result<undefined, ApiError>> {
  try {
    await api.put(`${baseUrl}/${id}/password`, changePasswordRequest, {
      headers: getAuthHeaders(bearerToken),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteUser(
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
