import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Task } from "@/app/dashboard/task-management/board/data"

export function EditTaskForm({ task }: { task?: Task }) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <DrawerHeader className="px-4">
        <DrawerTitle>Edit Task</DrawerTitle>
        <DrawerDescription>Edit the details for your task.</DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 px-4 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input id="taskName" placeholder="Enter task name" defaultValue={task?.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="featureName">Feature Name</Label>
          <Input id="featureName" placeholder="Enter feature name" defaultValue={task?.story} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select defaultValue={task?.priority}>
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={task?.status}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DrawerFooter className="flex justify-end px-4">
        <div className="flex flex-col space-y-2">
          <Button className="flex-1">Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </div>
  )
}