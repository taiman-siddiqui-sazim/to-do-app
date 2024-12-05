import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { IAddTaskProps } from "./AddTask.types";

export const AddTask = ({ onSubmit }: IAddTaskProps) => {
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
        className="text-black bg-gray-300 w-64"
      />
      <Button 
        type="submit" 
        className="bg-blue-500 text-white border-black hover:bg-blue-600"
      >
        Add Task
      </Button>
    </form>
  );
};
