import { LoginRequest } from "@/types/security/login";
import { UserRequest } from "@/types/users/user";
import {
  Result,
  IdResponse,
  ApiError,
  BearerToken,
  api,
  getAuthHeaders,
  handleError,
} from "@/common/commonImports";

const baseUrl = "/auth";

export async function login(
  loginRequest: LoginRequest
): Promise<Result<BearerToken, ApiError>> {
  try {
    const response = await api.post<BearerToken>(
      `${baseUrl}/login`,
      loginRequest
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function signup(
  userRequest: UserRequest,
  bearerToken?: BearerToken
): Promise<Result<IdResponse, ApiError>> {
  try {
    const response = await api.post<IdResponse>(
      `${baseUrl}/signup`,
      userRequest,
      {
        headers: bearerToken ? getAuthHeaders(bearerToken) : undefined,
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
}
