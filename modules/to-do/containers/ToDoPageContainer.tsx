import { useState } from "react";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { HomePageLayout } from "@/shared/layouts/HomePageLayout";
import { ITask } from "@/shared/typedefs";
import { deleteTaskFromApi } from "@/shared/utils/TaskApi";

export const ToDoPageContainer = () => {
  const [updatedTask, setUpdatedTask] = useState<ITask | undefined>(undefined); 

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
      await deleteTaskFromApi(taskId);
      console.log("Task deleted with ID:", taskId);
      setUpdatedTask(undefined); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <HomePageLayout>
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList
        updatedTask={updatedTask}
        onDeleteTask={handleTaskDeleted}
        onUpdateTask={handleTaskUpdated}
      />
    </HomePageLayout>
  );
};
