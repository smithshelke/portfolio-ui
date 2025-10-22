"use server";

import { Task } from "./data";

interface TaskPayload {
  name: string;
  description: string;
  created_by: string;
  feature_id: string;
  priority: string;
  status: string;
  git_data: {};
}

export async function getTasks(): Promise<Task[]> {
  try {
    const res = await fetch("http://localhost:8080/tasks", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const tasks = await res.json();
    return tasks.map((task: any) => ({
      id: task.id,
      name: task.name,
      priority: task.priority,
      featureName: task.feature_name,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      status: task.status,
      description: task.description.string,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export async function getFeatures(): Promise<{ id: string; name: string }[]> {
  try {
    const res = await fetch("http://localhost:8080/features", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch features");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}

export async function createTask(task: TaskPayload): Promise<any> {
  try {
    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error("Failed to create task");
    }
    return await res.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
}
