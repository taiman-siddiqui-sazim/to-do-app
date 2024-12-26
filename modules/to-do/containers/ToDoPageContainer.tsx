import { useState } from "react";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { HomePageLayout } from "@/shared/layouts/HomePageLayout";
import { ITask } from "@/shared/typedefs";

export const ToDoPageContainer = () => {
  const [updatedTask, setUpdatedTask] = useState<ITask | undefined>(undefined);
  const [deletedTaskId, setDeletedTaskId] = useState<number | undefined>(undefined);

  const handleTaskAdded = (newTask: ITask) => {
    console.log("Task added:", newTask);
    setUpdatedTask(newTask); 
  };

  const handleTaskUpdated = (editedTask: ITask) => {
    console.log("Task updated:", editedTask);
    setUpdatedTask(editedTask); 
  };

  const handleTaskDeleted = async (taskId: number) => {
    try {
      console.log("Task deleted with ID:", taskId);
      setDeletedTaskId(taskId); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <HomePageLayout>
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList
        updatedTask={updatedTask}
        deletedTaskId={deletedTaskId}
        onDeleteTask={handleTaskDeleted}
        onUpdateTask={handleTaskUpdated}
      />
    </HomePageLayout>
  );
};
