// Generic API Response Types (matching backend docs)
export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  your_role?: string;
  required_roles?: string[];
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}