import { FilterOutlined, LoadingOutlined } from '@ant-design/icons';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button, Checkbox, Input, Spin, Tooltip } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDecisionTableFilterOrThrow } from '../context/dt-filter.context';

export type TableColumnFilterProps = {
  columnId: string;
  columnName?: string;
  disabled?: boolean;
  className?: string;
};

export const TableColumnFilter: React.FC<TableColumnFilterProps> = ({
  columnId,
  columnName,
  disabled,
  className,
}) => {
  const { columnFilters, setColumnFilters, getUniqueValuesAsync } = useDecisionTableFilterOrThrow();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [uniqueValues, setUniqueValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Load all unique values when dropdown opens; computed in chunks so UI stays responsive */
  useEffect(() => {
    if (!dropdownOpen) {
      setUniqueValues([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getUniqueValuesAsync(columnId)
      .then((result) => {
        if (!cancelled) {
          setUniqueValues(result.values);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dropdownOpen, columnId, getUniqueValuesAsync]);

  const selectedSet = useMemo(() => {
    const filter = columnFilters.find((f) => f.id === columnId);
    const value = filter?.value;
    if (Array.isArray(value)) return new Set(value as string[]);
    if (value != null) return new Set([String(value)]);
    return new Set<string>();
  }, [columnFilters, columnId]);

  const filteredValues = useMemo(() => {
    if (!search.trim()) return uniqueValues;
    const s = search.toLowerCase();
    return uniqueValues.filter((v) => String(v).toLowerCase().includes(s));
  }, [uniqueValues, search]);

  const virtualizer = useVirtualizer({
    count: filteredValues.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 28,
    overscan: 5,
  });

  const isFilterActive = selectedSet.size > 0;
  const allSelected = filteredValues.length > 0 && filteredValues.every((v) => selectedSet.has(String(v)));

  const toggleValue = (value: string) => {
    setColumnFilters((prev) => {
      const filter = prev.find((f) => f.id === columnId);
      const currentSet = new Set(Array.isArray(filter?.value) ? (filter.value as string[]) : filter?.value != null ? [String(filter.value)] : []);
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      const arr = Array.from(currentSet);
      const rest = prev.filter((f) => f.id !== columnId);
      if (arr.length === 0) return rest;
      return [...rest, { id: columnId, value: arr }];
    });
  };

  const selectAll = () => {
    setColumnFilters((prev) => {
      const rest = prev.filter((f) => f.id !== columnId);
      if (allSelected) return rest;
      return [...rest, { id: columnId, value: [...filteredValues].map(String) }];
    });
  };

  const clearFilter = () => {
    setColumnFilters((prev) => prev.filter((f) => f.id !== columnId));
    setSearch('');
    setDropdownOpen(false);
  };

  const content = (
    <div className={clsx('grl-dt-column-filter-dropdown', className)} style={{ minWidth: 200, maxHeight: 320 }}>
      <Input.Search
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
        size="small"
        style={{ marginBottom: 8 }}
      />
      <div ref={scrollRef} style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 8 }}>
        {loading ? (
          <div style={{ padding: 16, textAlign: 'center' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <div className="grl-dt-text-secondary" style={{ fontSize: 12, marginTop: 8 }}>
              Loading values…
            </div>
          </div>
        ) : filteredValues.length === 0 ? (
          <span className="grl-dt-text-secondary" style={{ fontSize: 12 }}>
            No values
          </span>
        ) : (
          <>
            <div style={{ marginBottom: 4 }}>
              <Checkbox
                checked={allSelected}
                indeterminate={!allSelected && filteredValues.some((v) => selectedSet.has(String(v)))}
                onChange={selectAll}
              >
                <span style={{ fontSize: 12 }}>(Select all)</span>
              </Checkbox>
            </div>
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const value = filteredValues[virtualRow.index];
                const str = String(value ?? '');
                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                      marginBottom: 2,
                    }}
                  >
                    <Checkbox
                      checked={selectedSet.has(str)}
                      onChange={() => toggleValue(str)}
                      style={{ fontSize: 12 }}
                    >
                      {str || '(empty)'}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Button type="link" size="small" onClick={clearFilter} style={{ padding: 0, fontSize: 12 }}>
        Clear filter
      </Button>
    </div>
  );

  return (
    <DropdownWrap
      content={content}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      disabled={disabled}
    >
      <Tooltip title={columnName ? `Filter ${columnName}` : 'Filter column'}>
        <Button
          type="text"
          size="small"
          icon={<FilterOutlined />}
          className={clsx('grl-dt-column-filter-btn', isFilterActive && 'grl-dt-column-filter-btn--active')}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) setDropdownOpen((o) => !o);
          }}
        />
      </Tooltip>
    </DropdownWrap>
  );
};

type DropdownWrapProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
};

function DropdownWrap({ children, content, open, onOpenChange, disabled }: DropdownWrapProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open || disabled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onOpenChange, disabled]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', marginLeft: 4 }} onClick={(e) => e.stopPropagation()}>
      {children}
      {open && (
        <div
          className="grl-dt-column-filter-dropdown-panel"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1050,
            background: 'var(--grl-color-bg-elevated, #fff)',
            border: '1px solid var(--grl-color-border, #d9d9d9)',
            borderRadius: 6,
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            padding: 8,
            marginTop: 4,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
