
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
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
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ChevronLeft, ChevronRight, ListFilter, ArrowUpDown, Plus } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateTaskForm } from "@/components/create-task-form"
import { Task } from "./data"

import { EditTaskForm } from "@/components/edit-task-form"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    openEditDialog: (task: TData) => void
    openDeleteDialog: (task: TData) => void
  }
}

interface DataTableProps<TData extends Task, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Task, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState<TData | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [taskToDelete, setTaskToDelete] = React.useState<TData | null>(null)
  const isMobile = useIsMobile()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      openEditDialog: (task: TData) => {
        setSelectedTask(task)
        setIsEditDialogOpen(true)
      },
      openDeleteDialog: (task: TData) => {
        setTaskToDelete(task)
        setIsDeleteDialogOpen(true)
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto">
              <ListFilter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide() && column.id !== 'actions')
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* New Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => table.getColumn("priority")?.toggleSorting(false)}>
              Priority (Asc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("priority")?.toggleSorting(true)}>
              Priority (Desc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("status")?.toggleSorting(false)}>
              Status (Asc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("status")?.toggleSorting(true)}>
              Status (Desc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("startedOn")?.toggleSorting(false)}>
              Started On (Asc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("startedOn")?.toggleSorting(true)}>
              Started On (Desc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("completedOn")?.toggleSorting(false)}>
              Completed On (Asc)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("completedOn")?.toggleSorting(true)}>
              Completed On (Desc)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isMobile ? (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Plus className="h-4 w-4" />
                {!isMobile && "Create Task"}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-[300px] p-2"><CreateTaskForm /></DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Plus className="h-4 w-4" />
                {!isMobile && "Create Task"}
              </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[300px] p-2"><CreateTaskForm /></DialogContent>
          </Dialog>
        )}
      </div>
      {isMobile ? (
        <Drawer open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DrawerContent className="min-h-[300px] p-2">
            {selectedTask && <EditTaskForm task={selectedTask as Task} />}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="min-h-[300px] p-2">
            {selectedTask && <EditTaskForm task={selectedTask as Task} />}
          </DialogContent>
        </Dialog>
      )}
      {isMobile ? (
        <Drawer open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone. This will permanently delete your
                task and remove your data from our servers.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => {
                console.log(`Deleting task ${taskToDelete?.id}`)
                setIsDeleteDialogOpen(false)
              }}>
                Delete
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                task and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => {
                console.log(`Deleting task ${taskToDelete?.id}`)
                setIsDeleteDialogOpen(false)
              }}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div className="rounded-md border h-[calc(100vh-200px)] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/50">
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
                  No results.
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
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
