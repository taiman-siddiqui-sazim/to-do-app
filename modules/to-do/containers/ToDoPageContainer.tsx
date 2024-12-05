import { useState, useEffect } from "react";
import { AddTask } from "../components/AddTask/AddTask";
import { TaskList } from "../components/TaskList/TaskList";
import { ITask } from "@/shared/typedefs/interfaces";

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

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center bg-gray-800">
      <h1 className="text-3xl font-bold text-white mb-8">To-Do App</h1>
      <AddTask onSubmit={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};
