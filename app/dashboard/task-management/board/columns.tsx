"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "./data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, XCircle, CircleDot, Github, Sparkles, Pencil, Trash } from "lucide-react";
import { updateTask } from "@/app/dashboard/task-management/board/actions";
import { toast } from "sonner";

const priorityMap = {
  low: "bg-blue-50 border-blue-200 text-blue-700",
  medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
  high: "bg-red-50 border-red-200 text-red-700",
};

const statusMap = {
  "todo": "bg-gray-50 border-gray-200 text-gray-700",
  "in-progress": "bg-blue-50 border-blue-200 text-blue-700",
  "done": "bg-green-50 border-green-200 text-green-700",
  "canceled": "bg-red-50 border-red-200 text-red-700",
};

function formatPriority(priority: string) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function formatStatus(status: string) {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
    case "canceled":
      return "Canceled";
    default:
      return status;
  }
}

const priorityOrder = ["low", "medium", "high"];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
  },
  {
    accessorKey: "featureName",
    header: "Feature Name",
    cell: ({ row }) => {
      const featureName: string = row.getValue("featureName");
      if (!featureName) {
        return "-";
      }
      const words = featureName.split(" ");
      if (words.length > 3) {
        return words.slice(0, 3).join(" ") + "...";
      }
      return featureName;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    sortingFn: (rowA, rowB, columnId) => {
      const priorityA = rowA.getValue(columnId) as string;
      const priorityB = rowB.getValue(columnId) as string;
      return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority") as keyof typeof priorityMap;
      return (
        <Badge className={cn(priorityMap[priority])}>
          {formatPriority(priority)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      if (!updatedAt) return "-";
      const date = new Date(updatedAt as string);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusMap;
      return (
        <Badge className={cn(statusMap[status])}>
          {formatStatus(status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const task = row.original;

      const handleStatusUpdate = async (newStatus: string) => {
        try {
          await updateTask(task.id, {
            name: task.name,
            description: task.description,
            feature_id: task.feature_id,
            priority: task.priority,
            status: newStatus,
            git_data: {},
          });
          toast.success("Task successfully updated");
        } catch {
          toast.error("Task update failed");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => table.options.meta?.openEditDialog(task)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate("done")}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Done
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate("canceled")}>
              <XCircle className="mr-2 h-4 w-4" />
              Mark as Canceled
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusUpdate("in-progress")}>
              <CircleDot className="mr-2 h-4 w-4" />
              Mark as In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(`Opening GitHub PR for task ${task.id}`)}>
              <Github className="mr-2 h-4 w-4" />
              Open GitHub PR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(`Attempting task ${task.id} with AI`)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Attempt with AI
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.options.meta?.openDeleteDialog(task)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
