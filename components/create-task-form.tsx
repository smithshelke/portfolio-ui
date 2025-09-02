import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function CreateTaskForm() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <DrawerHeader className="px-4">
        <DrawerTitle>Create New Task</DrawerTitle>
        <DrawerDescription>Fill in the details for your new task.</DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 px-4 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input id="taskName" placeholder="Enter task name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="featureName">Feature Name</Label>
          <Input id="featureName" placeholder="Enter feature name" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
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
            <Select>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
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