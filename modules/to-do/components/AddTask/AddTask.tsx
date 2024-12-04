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
        className="text-black bg-gray-200 w-64"
      />
      <Button type="submit" variant="default">
        Add Task
      </Button>
    </form>
  );
};
