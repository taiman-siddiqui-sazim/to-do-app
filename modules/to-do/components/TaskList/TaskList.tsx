import { TTaskListProps } from "./TaskList.types";

export const TaskList = ({ tasks }: TTaskListProps) => {
  return (
    <ul className="mt-4 space-y-2 flex flex-col items-center">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 border rounded bg-gray-400 shadow-sm w-64 text-black"
        >
          <h3 className="font-bold">{task.title}</h3>
        </li>
      ))}
    </ul>
  );
};
