import { useState } from "react";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { HomePageLayout } from "@/shared/layouts/HomePageLayout";
import { ITask } from "@/shared/typedefs";
import { deleteTaskFromApi, fetchTasksFromApi } from "@/shared/utils/TaskApi";

export const ToDoPageContainer = () => {
  const [singleTask, setSingleTask] = useState<ITask | null>(null); 

  const handleTaskAdded = async (taskId: number) => {
    try {
      const newTask = await fetchTasksFromApi(taskId);
      setSingleTask(newTask as ITask); 
    } catch (error) {
      console.error("Error fetching added task:", error);
    }
  };

  const handleTaskUpdated = async (task: ITask) => {
    setSingleTask(task); 
  };

  const handleTaskDeleted = async (taskId: number) => {
    try {
      await deleteTaskFromApi(taskId);
      setSingleTask(null); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <HomePageLayout>
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList
        singleTask={singleTask} 
        onUpdateTask={handleTaskUpdated}
        onDeleteTask={handleTaskDeleted}
      />
    </HomePageLayout>
  );
};
