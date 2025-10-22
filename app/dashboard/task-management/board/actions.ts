"use server";

import { revalidatePath } from "next/cache";
import { Task } from "./data";

interface TaskPayload {
  name: string;
  description: string;
  created_by: string;
  feature_id: string;
  priority: string;
  status: string;
  git_data: object;
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
    return tasks.map((task: Task) => ({
      id: task.id,
      name: task.name,
      priority: task.priority,
      featureName: task.feature_name,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      status: task.status,
      description: task.description,
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

export async function createTask(task: TaskPayload): Promise<Task> {
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
    revalidatePath("/dashboard/task-management");
    return await res.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export async function updateTask(id: string, task: Omit<TaskPayload, "created_by">): Promise<Task> {
  try {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error("Failed to update task");
    }
    revalidatePath("/dashboard/task-management");
    return await res.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
