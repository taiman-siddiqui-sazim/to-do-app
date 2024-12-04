import { useState, useEffect } from "react";
import { AddTask } from "../components/AddTask/AddTask";
import { TaskList } from "../components/TaskList/TaskList";

export const ToDoPageContainer = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: { title: string }) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center bg-blue-900">
      <h1 className="text-3xl font-bold text-white mb-8">To-Do App</h1>
      <AddTask onSubmit={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};
