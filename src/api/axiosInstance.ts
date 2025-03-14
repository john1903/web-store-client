import axios from "axios";
import { ApiError, Result, BearerToken } from "@/common/commonImports";

const BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
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
