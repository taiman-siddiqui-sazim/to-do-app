import { useState } from "react";
import { TTaskListProps } from "./TaskList.types";
import { ITask } from "@/shared/typedefs";
import { EditTask } from "../EditTask";
import { DeleteTask } from "../DeleteTask";
import { Button, Card } from "@/shared/components/ui";

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
    <>
      <Card className="mt-4 h-96 overflow-y-auto p-4 border border-blue-500 shadow-md rounded bg-gray-800">
        <ul className="space-y-4 flex flex-col items-center">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded bg-gray-300 shadow-sm w-[28rem] text-black flex justify-between items-center"
            >
          
              <span className="text-m font-bold text-gray-800 flex-grow">
                {task.title}
              </span>

              <div className="flex gap-2 ml-auto">
                <Button
                  onClick={() => openEditModal(task)}
                  className="bg-blue-800 text-white text-xs px-2 py-1 hover:bg-blue-600 border-black"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => openDeleteModal(task)}
                  className="bg-red-600 text-white text-xs px-2 py-1 hover:bg-red-500 border-black"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

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
          onDelete={() => {
            onDeleteTask(taskToDelete.id);
            closeDeleteModal();
          }}
        />
      )}
    </>
  );
};
