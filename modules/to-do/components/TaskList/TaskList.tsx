import { useState, useEffect } from "react";
import { ITask, MAX_TITLE_LENGTH } from "@/shared/typedefs";
import { TTaskListProps } from "./TaskList.types";
import { EditTask } from "../EditTask";
import { DeleteTask } from "../DeleteTask";
import { Button, Card } from "@/shared/components/ui";
import { ExpandModal } from "@/shared/components/ExpandModal";
import { TaskListStyles } from "./TaskList.styles";
import { fetchTasksFromApi } from "@/shared/utils/TaskApi";

export const TaskList = ({ singleTask, onUpdateTask, onDeleteTask }: TTaskListProps) => {
  const [localTasks, setLocalTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [expandedTask, setExpandedTask] = useState<ITask | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await fetchTasksFromApi();
        setLocalTasks(tasks as ITask[]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (singleTask) {
      setLocalTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((task) => task.id === singleTask.id);
        if (taskIndex >= 0) {
          const updatedTasks = [...prevTasks];
          updatedTasks[taskIndex] = singleTask; 
          return updatedTasks;
        } else {
          return [...prevTasks, singleTask]; 
        }
      });
    }
  }, [singleTask]);

  const openEditModal = (task: ITask) => setSelectedTask(task);
  const closeEditModal = () => setSelectedTask(null);

  const openDeleteModal = (task: ITask) => setTaskToDelete(task);
  const closeDeleteModal = () => setTaskToDelete(null);

  const openExpandModal = (task: ITask) => setExpandedTask(task);
  const closeExpandModal = () => setExpandedTask(null);

  const toggleCompletion = (task: ITask) => {
    const updatedTask = { ...task, completed: !task.completed };
    onUpdateTask(updatedTask);
  };

  const handleDelete = (taskId: number) => {
    onDeleteTask(taskId);
    setLocalTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  if (localTasks.length === 0) return <p>No tasks found.</p>;

  return (
    <>
      <Card className={TaskListStyles.card}>
        <ul className="space-y-4">
          {localTasks.map((task) => {
            const isLongTask = task.title.length > MAX_TITLE_LENGTH;
            const truncatedTitle = isLongTask
              ? `${task.title.slice(0, MAX_TITLE_LENGTH)}...`
              : task.title;

            return (
              <li key={task.id} className={TaskListStyles.taskItem(task.completed)}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task)}
                  className={TaskListStyles.checkbox}
                />

                <span
                  className={`${TaskListStyles.taskTitle(task.completed)} whitespace-pre-wrap break-words`}
                >
                  {truncatedTitle}
                </span>

                {isLongTask && (
                  <Button
                    onClick={() => openExpandModal(task)}
                    className="ml-2 text-xs text-blue-700 underline bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    Expand
                  </Button>
                )}

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
            );
          })}
        </ul>
      </Card>

      {expandedTask && (
        <ExpandModal
          content={expandedTask.title}
          title="Task Details"
          onClose={closeExpandModal}
        />
      )}

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
            handleDelete(taskToDelete.id);
            closeDeleteModal();
          }}
        />
      )}
    </>
  );
};
