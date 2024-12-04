interface TaskListProps {
  tasks: { id: number; title: string; completed: boolean }[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="mt-4 space-y-2 flex flex-col items-center">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 border rounded bg-gray-200 shadow-sm w-64 text-black" // Light gray background for tasks
        >
          <h3 className="font-bold">{task.title}</h3>
        </li>
      ))}
    </ul>
  );
}
