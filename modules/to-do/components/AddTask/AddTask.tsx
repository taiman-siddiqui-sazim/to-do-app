import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { TAddTaskProps } from "./AddTask.types";
import { PopUp } from "@/shared/components/PopUp";

export const AddTask = ({ onSubmit }: TAddTaskProps) => {
  const [title, setTitle] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onSubmit({ title });
      setTitle("");
      setShowPopup(true); 

      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center mb-6 max-w-md mx-auto"
      >
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="text-black font-bold text-lg bg-gray-200 w-full sm:w-64"
        />
        <Button
          type="submit"
          className="bg-blue-700 text-white font-bold border-black hover:bg-blue-500 w-full sm:w-auto"
        >
          Add Task
        </Button>
      </form>

      <PopUp
        message="Task Added Successfully!"
        type="success"
        isVisible={showPopup}
      />
    </div>
  );
};
