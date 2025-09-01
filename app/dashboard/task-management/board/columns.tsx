"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "./data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const priorityMap = {
  low: "bg-blue-50 border-blue-200 text-blue-700",
  medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
  high: "bg-red-50 border-red-200 text-red-700",
}

const statusMap = {
  "todo": "bg-gray-50 border-gray-200 text-gray-700",
  "in-progress": "bg-blue-50 border-blue-200 text-blue-700",
  "done": "bg-green-50 border-green-200 text-green-700",
  "canceled": "bg-red-50 border-red-200 text-red-700",
}

function formatPriority(priority: string) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

function formatStatus(status: string) {
  switch (status) {
    case "todo":
      return "To Do"
    case "in-progress":
      return "In Progress"
    case "done":
      return "Done"
    case "canceled":
      return "Canceled"
    default:
      return status
  }
}

const priorityOrder = ["low", "medium", "high"]

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
  },
  {
    accessorKey: "story",
    header: "Feature",
    cell: ({ row }) => {
      const story: string = row.getValue("story")
      const words = story.split(" ")
      if (words.length > 3) {
        return words.slice(0, 3).join(" ") + "..."
      }
      return story
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    sortingFn: (rowA, rowB, columnId) => {
      const priorityA = rowA.getValue(columnId) as string
      const priorityB = rowB.getValue(columnId) as string
      return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB)
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as keyof typeof priorityMap
      return (
        <Badge className={cn(priorityMap[priority])}>
          {formatPriority(priority)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "startedOn",
    header: "Started On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startedOn"))
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
  accessorKey: "completedOn",
    header: "Completed On",
    cell: ({ row }) => {
      const completedOn = row.getValue("completedOn")
      if (!completedOn) return "-"
      const date = new Date(completedOn as string)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusMap
      return (
        <Badge className={cn(statusMap[status])}>
          {formatStatus(status)}
        </Badge>
      )
    },
  },
]
