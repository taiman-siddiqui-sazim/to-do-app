import { useState } from "react";
import { TTaskListProps } from "./TaskList.types";
import { ITask } from "@/shared/typedefs";
import { EditTask } from "../EditTask";
import { DeleteTask } from "../DeleteTask";
import { Button, Card } from "@/shared/components/ui";
import { TaskListStyles } from "./TaskList.styles";

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

  const toggleCompletion = (task: ITask) => {
    const updatedTask = { ...task, completed: !task.completed };
    onUpdateTask(updatedTask);
  };

  return (
    <>
      <Card className={TaskListStyles.card}>
        <ul className="space-y-4 flex flex-col items-center">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={TaskListStyles.taskItem(task.completed)}
            >
          
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task)}
                className={TaskListStyles.checkbox}
              />
            
              <span className={TaskListStyles.taskTitle(task.completed)}>
                {task.title}
              </span>

              <div className={TaskListStyles.divider}></div>

              <div className={TaskListStyles.buttonGroup}>
                <Button
                  onClick={() => openEditModal(task)}
                  disabled={task.completed}
                  className={TaskListStyles.editButton(task.completed)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => openDeleteModal(task)}
                  className={TaskListStyles.deleteButton}
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
