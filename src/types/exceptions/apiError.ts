import { ApiErrorDetail } from "@/types/exceptions/apiErrorDetail";

export interface ApiError {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: ApiErrorDetail[];
}
