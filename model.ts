export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const usedIds = new Set(tasks.map((task) => task.id));
  let id = 1;

  while (usedIds.has(id) && id < Number.MAX_SAFE_INTEGER) {
    id += 1;
  }

  if (usedIds.has(id)) {
    throw new RangeError("Unable to generate a unique task id.");
  }

  return [...tasks, { id, title, status: "todo" }];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task,
  );
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}
