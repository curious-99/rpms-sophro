import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ArrowRight from '../../../assets/icons/arrow-right-black.svg';

interface CustomReactTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
}

export function CustomReactTable<TData, TValue>({
  data,
  columns,
  showSearch = true,
  searchPlaceholder = 'Search...',
  globalFilter,
  onGlobalFilterChange,
}: CustomReactTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [globalFilter, setGlobalFilter] = useState('');
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');

  const actualGlobalFilter = globalFilter !== undefined ? globalFilter : internalGlobalFilter;
  const handleGlobalFilterChange = onGlobalFilterChange || setInternalGlobalFilter;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setInternalGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter: actualGlobalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* {showSearch && (
        <div className="flex items-center justify-end">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={actualGlobalFilter}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )} */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-center'>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex items-center justify-center gap-1 cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ArrowUpDown className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-center'> 
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div>
            Showing{' '}
            <strong>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{' '}
              -{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </strong>{' '}
            of <strong>{table.getFilteredRowModel().rows.length}</strong>{' '}
            results
          </div>
          <div className="flex items-center gap-1">
            <span>Show</span>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize.toString()}
                />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>per page</span>
          </div>
        </div>

        <Pagination className="justify-end pr-8">
          <PaginationContent>

            {/* First Page Button
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem> */}

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <img src={ArrowRight} alt="Arrow Right" className="h-6 w-6 rotate-180" />
                <span>Prev</span>
              </Button>
            </PaginationItem>
            {Array.from({ length: Math.min(5, table.getPageCount()) }).map(
              (_, i) => {
                const pageIndex =
                  table.getPageCount() <= 5
                    ? i
                    : Math.min(
                        Math.max(
                          0,
                          table.getState().pagination.pageIndex - 2
                        ) + i,
                        table.getPageCount() - 1
                      );
                
                return (
                  <PaginationItem key={pageIndex}>
                    <Button
                      variant={pageIndex === table.getState().pagination.pageIndex ? "default" : "outline"}
                      size="icon"
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={
                        pageIndex === table.getState().pagination.pageIndex 
                          ? "!bg-[#14B8A6] text-white hover:!bg-[#14B8A6]/90" 
                          : ""
                      }
                    >
                      {pageIndex + 1}
                    </Button>
                  </PaginationItem>
                );
              }
            )}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span>Next</span>
                <img src={ArrowRight} alt="Arrow Right" className="h-6 w-6" />
              </Button>
            </PaginationItem>

            {/* //Last Page Button */}
            {/* <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem> */}

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default CustomReactTable;
