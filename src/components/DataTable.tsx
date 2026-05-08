import React, { useMemo, useState } from 'react';
import styles from './DataTable.module.css';

export interface DataTableColumn<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  width?: string;
  /** Custom cell renderer */
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Optional per-row click handler (e.g. open a drawer) */
  onRowClick?: (row: T) => void;
  /** Show a checkbox column for selection */
  selectable?: boolean;
  /** Called whenever the selection set changes */
  onSelectionChange?: (selected: T[]) => void;
  /** Enable client-side pagination (default false) */
  paginated?: boolean;
  pageSize?: number;
  /** Empty-state message */
  emptyMessage?: string;
}

type SortState<T> = { key: keyof T & string; direction: 'asc' | 'desc' } | null;

/**
 * Sortable, optionally selectable + paginated data table.
 * Sticky header on desktop, horizontal scroll on mobile.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  selectable = false,
  onSelectionChange,
  paginated = false,
  pageSize = 10,
  emptyMessage = 'No data to display',
}: DataTableProps<T>): JSX.Element {
  const [sort, setSort] = useState<SortState<T>>(null);
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sorted = useMemo(() => {
    if (!sort) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return sort.direction === 'asc' ? -1 : 1;
      if (av > bv) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sort]);

  const pageCount = paginated ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const visible = paginated ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  const toggleSort = (key: keyof T & string): void => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' };
      if (prev.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  };

  const toggleRow = (idx: number): void => {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
    if (onSelectionChange) {
      onSelectionChange(Array.from(next).map((i) => sorted[i]).filter(Boolean) as T[]);
    }
  };

  const allSelected = visible.length > 0 && visible.every((_, i) => selected.has(page * pageSize + i));
  const toggleAll = (): void => {
    const next = new Set(selected);
    if (allSelected) {
      visible.forEach((_, i) => next.delete(page * pageSize + i));
    } else {
      visible.forEach((_, i) => next.add(page * pageSize + i));
    }
    setSelected(next);
    if (onSelectionChange) {
      onSelectionChange(Array.from(next).map((i) => sorted[i]).filter(Boolean) as T[]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? styles.sortable : undefined}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  aria-sort={
                    sort?.key === col.key
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  <span>{col.label}</span>
                  {col.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sort?.key === col.key ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.empty}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              visible.map((row, i) => {
                const absIdx = page * pageSize + i;
                const isSelected = selected.has(absIdx);
                return (
                  <tr
                    key={absIdx}
                    className={isSelected ? styles.selected : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    style={onRowClick ? { cursor: 'pointer' } : undefined}
                  >
                    {selectable && (
                      <td
                        className={styles.checkboxCell}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(absIdx)}
                          aria-label={`Select row ${absIdx + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {paginated && pageCount > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            &larr;
          </button>
          <span aria-live="polite">
            Page {page + 1} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
            aria-label="Next page"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
