import { useState, useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { HomePageLayout } from "@/shared/layouts/HomePageLayout";
import { ITask } from "@/shared/typedefs";
import { fetchTasksFromApi } from "@/shared/utils/TaskApi";

export const ToDoPageContainer = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await fetchTasksFromApi();
      setTasks(fetchedTasks); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const updateTask = (updatedTask: ITask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <HomePageLayout>
      <AddTask onTaskAdded={fetchTasks} />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </HomePageLayout>
  );
};
