import { useState, useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { HomePageLayout } from "@/shared/layouts/HomePageLayout";
import { ITask } from "@/shared/typedefs";

export const ToDoPageContainer = () => {
  const [tasks, setTasks] = useState<ITask[]>([]); 

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (task: { title: string }) => {
    const updatedTasks: ITask[] = [
      ...tasks,
      { id: Date.now(), title: task.title, completed: false },
    ];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask: ITask) => {
    const updatedTasks: ITask[] = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <HomePageLayout>
      <AddTask onSubmit={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} />
    </HomePageLayout>
  );
};
