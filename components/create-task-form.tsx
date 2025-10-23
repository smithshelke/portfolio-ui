import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import { getFeatures, createTask } from "@/app/dashboard/task-management/board/actions"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea"

export function CreateTaskForm() {
  const [features, setFeatures] = React.useState<{ id: string; name: string }[]>([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedFeature, setSelectedFeature] = React.useState<string | undefined>(undefined);
  const [priority, setPriority] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const closeDrawerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    async function loadFeatures() {
      const features = await getFeatures();
      setFeatures(features);
    }
    loadFeatures();
  }, []);

  const handleSubmit = async () => {
    if (!name || !description || !selectedFeature || !priority || !status) {
      toast.error("All fields are required");
      return;
    }
    try {
      await createTask({
        name,
        description,
        created_by: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // Hardcoded for now
        feature_id: selectedFeature,
        priority,
        status,
      });
      toast.success("Task successfully created");
      closeDrawerRef.current?.click();
    } catch {
      toast.error("Task creation failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <DrawerHeader className="px-4">
        <DrawerTitle>Create New Task</DrawerTitle>
        <DrawerDescription>Fill in the details for your new task.</DrawerDescription>
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
