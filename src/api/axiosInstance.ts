import axios from "axios";
import { BearerToken } from "@/types/security/bearerToken";
import { ApiError } from "@/types/exceptions/apiError";
import { Result } from "@/types/common/result";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function getAuthHeaders(bearerToken: BearerToken) {
  return {
    Authorization: `Bearer ${bearerToken.token}`,
  };
}

export function handleError<T>(error: unknown): Result<T, ApiError> {
  if (axios.isAxiosError(error) && error.response) {
    const apiError = error.response.data as ApiError;
    return { ok: false, error: apiError };
  }
  throw error;
}

export default axiosInstance;
