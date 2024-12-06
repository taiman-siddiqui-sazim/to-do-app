import { useState } from "react";
import { TTaskListProps } from "./TaskList.types";
import { ITask } from "@/shared/typedefs";
import { EditTask } from "../EditTask";
import { DeleteTask } from "../DeleteTask";
import { Button } from "@/shared/components/ui";

export const TaskList = ({ tasks, onUpdateTask, onDeleteTask }: TTaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  const openEditModal = (task: ITask) => {
    setSelectedTask(task);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
  };

  const openDeleteModal = (task: ITask) => {
    setTaskToDelete(task);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
  };

  return (
    <div>
      <ul className="mt-4 space-y-2 flex flex-col items-center">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 border rounded bg-gray-300 shadow-sm w-96 text-black flex justify-between items-center"
          >
            <span className="text-lg font-bold text-grey-500">{task.title}</span>
            <div className="absolute top-2 right-2 flex gap-2">
            <Button
              onClick={() => openEditModal(task)}
              variant="default"
              className="ml-2 text-xs font-bold px-3 py-2 bg-blue-900 hover:bg-blue-600"
            >
              Edit
            </Button>
            <Button
                onClick={() => openDeleteModal(task)}
                className="bg-red-600 text-white text-xs px-2 py-1 hover:bg-red-500"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <EditTask
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={closeEditModal}
          onSave={(updatedTask) => {
            onUpdateTask(updatedTask);
            closeEditModal();
          }}
        />
      )}

      {taskToDelete && (
        <DeleteTask
          taskTitle={taskToDelete.title}
          isOpen={!!taskToDelete}
          onClose={closeDeleteModal}
          onDelete={() => onDeleteTask(taskToDelete.id)}
        />
      )}
    </div>
  );
};
