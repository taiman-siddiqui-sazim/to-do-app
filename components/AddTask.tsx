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
      setTitle(""); // Clear input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
        className="text-black w-64" // Ensure input text is black and width is restricted
      />
      <Button type="submit" variant="default">
        Add Task
      </Button>
    </form>
  );
}
