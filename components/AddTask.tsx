import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddTaskFormProps {
  onSubmit: (task: { title: string }) => void;
}

export default function AddTaskForm({ onSubmit }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title });
      setTitle(""); // Clear title field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="text-black bg-gray-200 w-64" // Light gray background with restricted width
      />
      <Button type="submit" variant="default">
        Add Task
      </Button>
    </form>
  );
}
