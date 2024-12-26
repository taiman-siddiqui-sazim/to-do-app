import { useState, useEffect } from "react";
import { ITask, MAX_TITLE_LENGTH } from "@/shared/typedefs";
import { TTaskListProps } from "./TaskList.types";
import { EditTask } from "../EditTask";
import { DeleteTask } from "../DeleteTask";
import { Button, Card } from "@/shared/components/ui";
import { ExpandModal } from "@/shared/components/ExpandModal";
import { TaskListStyles } from "./TaskList.styles";
import { fetchTasksFromApi, updateTaskCompletionInApi } from "@/shared/utils/TaskApi";

export const TaskList = ({ updatedTask, onDeleteTask, onUpdateTask }: TTaskListProps) => {
  const [localTasks, setLocalTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [expandedTask, setExpandedTask] = useState<ITask | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await fetchTasksFromApi();
        const sortedTasks = (tasks as ITask[]).sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setLocalTasks(sortedTasks as ITask[]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (updatedTask) {
      setLocalTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((task) => task.id === updatedTask.id);
        const updatedTasks = [...prevTasks];
        if (taskIndex >= 0) {
          updatedTasks[taskIndex] = updatedTask; 
        } else {
          updatedTasks.push(updatedTask); 
        }
        return updatedTasks;
      });
    }
  }, [updatedTask]);


  const openEditModal = (task: ITask) => setSelectedTask(task);
  const closeEditModal = () => setSelectedTask(null);

  const openDeleteModal = (task: ITask) => setTaskToDelete(task);
  const closeDeleteModal = () => setTaskToDelete(null);

  const openExpandModal = (task: ITask) => setExpandedTask(task);
  const closeExpandModal = () => setExpandedTask(null);

  const toggleCompletion = async (task: ITask) => {
    try {
      const updatedTask = await updateTaskCompletionInApi(task.id, !task.completed);
      setLocalTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === task.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
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
                  className={`${TaskListStyles.taskTitle(task.completed)} ${
                    task.completed ? "line-through text-gray-400" : ""
                  } whitespace-pre-wrap break-words`}
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
          isOpen={Boolean(selectedTask)}
          onClose={closeEditModal}
          onTaskUpdated={(editedTask) => {
            onUpdateTask(editedTask);
            closeEditModal();
          }}
        />
      )}

      {taskToDelete && (
        <DeleteTask
          taskTitle={taskToDelete.title}
          isOpen={Boolean(taskToDelete)}
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
