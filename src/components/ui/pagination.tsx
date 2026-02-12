'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  /** For client components: callback on page change */
  onPageChange?: (page: number) => void
  /** For server components: base URL to build href links */
  baseUrl?: string
  /** Additional search params to preserve in URLs */
  searchParams?: Record<string, string>
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) return null

  // Build page numbers to show (max 7 with ellipsis)
  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  function buildHref(targetPage: number): string {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(targetPage))
    return `${baseUrl || ''}?${params.toString()}`
  }

  const buttonClass =
    'inline-flex h-9 min-w-[36px] items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors'
  const activeClass = 'bg-blue-600 text-white border-blue-600'
  const inactiveClass =
    'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
  const disabledClass = 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'

  // Client mode (callbacks)
  if (onPageChange) {
    return (
      <nav className="flex items-center justify-between" aria-label="Pagination">
        <p className="text-sm text-gray-500">
          Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={`${buttonClass} ${page <= 1 ? disabledClass : inactiveClass}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} className="px-1 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`${buttonClass} ${p === page ? activeClass : inactiveClass}`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={`${buttonClass} ${page >= totalPages ? disabledClass : inactiveClass}`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </nav>
    )
  }

  // Server mode (links)
  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      <p className="text-sm text-gray-500">
        Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        {page > 1 ? (
          <a href={buildHref(page - 1)} className={`${buttonClass} ${inactiveClass}`}>
            <ChevronLeft className="h-4 w-4" />
          </a>
        ) : (
          <span className={`${buttonClass} ${disabledClass}`}>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-1 text-gray-400">
              ...
            </span>
          ) : (
            <a
              key={p}
              href={buildHref(p)}
              className={`${buttonClass} ${p === page ? activeClass : inactiveClass}`}
            >
              {p}
            </a>
          )
        )}
        {page < totalPages ? (
          <a href={buildHref(page + 1)} className={`${buttonClass} ${inactiveClass}`}>
            <ChevronRight className="h-4 w-4" />
          </a>
        ) : (
          <span className={`${buttonClass} ${disabledClass}`}>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  )
}
