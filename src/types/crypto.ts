export interface IDataDTO {
  perf_24h: number;
  perf_7d: number;
  perf_30d: number;
  perf_90d: number;
  cryptocurrency: string;
}

export interface IPaginatedData {
  items: IDataDTO[];
  total: number;
  page: number;
  size: number;
  pages: number;
  links: {
    first: string | null;
    last: string | null;
    self: string | null;
    next: string | null;
    prev: string | null;
  };
}
