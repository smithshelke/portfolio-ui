export type Task = {
  id: string
  name: string
  priority: "low" | "medium" | "high"
  story: string
  startedOn: string
  completedOn?: string
  status: "todo" | "in-progress" | "done" | "canceled"
}

export async function getTasks(): Promise<Task[]> {
  const tasks: Task[] = []
  const priorities = ["low", "medium", "high"]
  const statuses = ["todo", "in-progress", "done", "canceled"]

  for (let i = 1; i <= 50; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)] as "todo" | "in-progress" | "done" | "canceled"
    const startedOn = `2023-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`
    let completedOn: string | undefined = undefined

    if (status === "done") {
      const start = new Date(startedOn)
      const end = new Date(start.getTime() + Math.random() * (90 * 24 * 60 * 60 * 1000)) // Add up to 90 days
      completedOn = end.toISOString().split('T')[0]
    }

    tasks.push({
      id: `task-${i}`,
      name: `Task ${i}: ${i % 2 === 0 ? "Develop Feature" : "Fix Bug"}`,
      priority: priorities[Math.floor(Math.random() * priorities.length)] as "low" | "medium" | "high",
      story: `${i % 3 === 0 ? "Improve performance" : i % 2 === 0 ? "Add functionality" : "Resolve issue"}`,
      startedOn: startedOn,
      completedOn: completedOn,
      status: status,
    })
  }
  return tasks
}