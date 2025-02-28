export interface PagedResponse<T> {
  totalPages: number;
  content: T[];
}
