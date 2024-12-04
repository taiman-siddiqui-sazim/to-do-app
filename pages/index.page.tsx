import { useState, useEffect } from "react";
import AddTaskForm from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { Task } from "../types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: { title: string }) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center bg-blue-900">
      <h1 className="text-3xl font-bold text-white mb-8">To-Do App</h1>
      <AddTaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}