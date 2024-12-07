import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { TAddTaskProps } from "./AddTask.types";

export const AddTask = ({ onSubmit }: TAddTaskProps) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="text-black font-bold text-lg bg-gray-200 w-64"
      />
      <Button 
        type="submit" 
        className="bg-blue-700 text-white font-bold border-black hover:bg-blue-500"
      >
        Add Task
      </Button>
    </form>
  );
};
