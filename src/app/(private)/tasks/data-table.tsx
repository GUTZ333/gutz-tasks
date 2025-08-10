"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import useFormCreateTask from "@/hooks/useFormCreateTask"
import { handleCreateTaskService } from "@/services/create-task.service"
import clsx from "clsx"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize
  })
  const { handleSubmit, formState: { isSubmitting, errors }, reset, register } = useFormCreateTask()

  const table = useReactTable({
    data,
    columns,
    manualPagination: false,
    rowCount: data.length,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    initialState: {
      pagination: {
        pageSize
      }
    },
    state: {
      sorting,
      columnFilters,
      pagination
    }
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("taskTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("taskTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-auto flex items-center gap-1">
              Create Task <PlusCircle width={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[380px]">
            <DialogHeader>
              <DialogTitle>Create a new Task</DialogTitle>
              <DialogDescription>This form is used to create a new task in your task gallery. Enter the name of the desired task and click create.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(async (data) => {
              await handleCreateTaskService(data);
              reset();
            })} noValidate className="flex flex-col gap-5">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <div className="flex flex-col gap-1">
                  <Input id="name-title" {...register("titleTask")} className={clsx(errors.titleTask ? "border border-red-600 shadow-red-600" : "")} />
                  {errors.titleTask && <span className="text-normal text-sm text-red-500">
                    {errors.titleTask.message}
                  </span>}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="destructive" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "creating..." : "create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  You dont have any tasks yet. click the button "Create Task" to create your first task.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}