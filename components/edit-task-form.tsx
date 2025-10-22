import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Task } from "@/app/dashboard/task-management/board/data"
import { Combobox } from "./ui/combobox"
import { getFeatures, updateTask } from "@/app/dashboard/task-management/board/actions"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"

export function EditTaskForm({ task }: { task?: Task }) {
  const [features, setFeatures] = React.useState<{ id: string; name: string }[]>([]);
  const [name, setName] = React.useState(task?.name || "");
  const [description, setDescription] = React.useState(task?.description || "");
  const [selectedFeature, setSelectedFeature] = React.useState<string | undefined>(undefined);
  const [priority, setPriority] = React.useState<string | undefined>(task?.priority);
  const [status, setStatus] = React.useState<string | undefined>(task?.status);
  const closeDrawerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    async function loadFeatures() {
      const features = await getFeatures();
      setFeatures(features);
      if (task?.feature_name) {
        const feature = features.find(f => f.name === task.feature_name);
        if (feature) {
          setSelectedFeature(feature.id);
        }
      }
    }
    loadFeatures();
  }, [task]);

  const handleSubmit = async () => {
    if (!task?.id || !name || !description || !selectedFeature || !priority || !status) {
      toast.error("All fields are required");
      return;
    }
    try {
      await updateTask(task.id, {
        name,
        description,
        feature_id: selectedFeature,
        priority,
        status,
        git_data: {},
      });
      toast.success("Task successfully updated");
      closeDrawerRef.current?.click();
    } catch {
      toast.error("Task update failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <DrawerHeader className="px-4">
        <DrawerTitle>Edit Task</DrawerTitle>
        <DrawerDescription>Edit the details for your task.</DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 px-4 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input id="taskName" placeholder="Enter task name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="featureName">Feature Name</Label>
          <Combobox
            options={features.map(feature => ({ value: feature.id, label: feature.name }))}
            value={selectedFeature}
            onChange={setSelectedFeature}
            placeholder="Select a feature"
            searchPlaceholder="Search features..."
            noResultsMessage="No features found."
            className="font-normal"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={setPriority} value={priority}>
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
            <Select onValueChange={setStatus} value={status}>
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
          <Button className="flex-1" onClick={handleSubmit}>Submit</Button>
          <DrawerClose asChild>
            <Button ref={closeDrawerRef} variant="outline" className="flex-1">Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </div>
  )
}
