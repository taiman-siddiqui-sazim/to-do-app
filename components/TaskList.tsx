import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="mt-4 space-y-2 flex flex-col items-center">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-2 border rounded bg-white shadow-sm w-64 text-black" // Centered and ensures black text
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
