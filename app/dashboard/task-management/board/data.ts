export type Task = {
  id: string;
  name: string;
  priority: "low" | "medium" | "high";
  featureName: string;
  createdAt: string;
  updatedAt: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  description: string;
};
