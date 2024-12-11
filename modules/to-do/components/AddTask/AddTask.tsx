import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { TAddTaskProps } from "./AddTask.types";
import { HTaskSchema } from "@/shared/typedefs";
import { PopUp } from "@/shared/components/PopUp";

export const AddTask = ({ onSubmit }: TAddTaskProps) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = HTaskSchema.safeParse({ title });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setError(null);
    const validatedTask = validationResult.data;
    onSubmit(validatedTask);

    setTitle("");
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center mb-6 max-w-md mx-auto"
      >
        <div className="w-full relative">
          {/* Display error message above the input */}
          {error && (
            <p className="text-red-500 text-sm mb-1 absolute top-[-20px] left-0">
              {error}
            </p>
          )}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="text-black font-bold text-lg bg-gray-200 w-full sm:w-96"
          />
        </div>
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
