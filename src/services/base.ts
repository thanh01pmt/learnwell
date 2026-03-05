/**
 * Base types and interfaces for all services
 */

export interface ServiceResult<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  error: Error | null;
}

/**
 * Common error handling for services
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}
