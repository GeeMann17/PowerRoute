export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 100

/**
 * Parse pagination params from URLSearchParams with defaults and bounds.
 */
export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const rawPage = parseInt(searchParams.get('page') || '1', 10)
  const rawPageSize = parseInt(searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE), 10)

  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage)
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, isNaN(rawPageSize) ? DEFAULT_PAGE_SIZE : rawPageSize))

  return { page, pageSize }
}

/**
 * Calculate the Supabase `.range(from, to)` values from pagination params.
 */
export function paginationRange(params: PaginationParams): { from: number; to: number } {
  const from = (params.page - 1) * params.pageSize
  const to = from + params.pageSize - 1
  return { from, to }
}

/**
 * Build a paginated response envelope.
 */
export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResponse<T> {
  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: Math.ceil(total / params.pageSize),
  }
}
