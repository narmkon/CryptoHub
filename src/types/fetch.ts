export interface FetchStats {
  totalBatches: number;
  successfulBatches: number;
  failedBatches: number;
  retriedBatches: number;
  totalItems: number;
  loadTime: number;
}

export interface FetchOptions {
  pageSize?: number;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  baseUrl?: string;
}
