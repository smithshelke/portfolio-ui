export type Task = {
  id: string;
  name: string;
  priority: "low" | "medium" | "high";
  feature_name: string;
  feature_id: string;
  created_at: string;
  updated_at: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  description: string;
  git_data: any;
};
