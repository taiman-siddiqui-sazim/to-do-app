import { useState } from "react";
import { Button, Input } from "@/shared/components/ui";
import { taskSchema } from "@/shared/typedefs";
import { PopUp } from "@/shared/components/PopUp";
import { addTaskToApi } from "@/shared/utils/TaskApi";
import { TAddTaskProps } from "./AddTask.types";

export const AddTask = ({ onTaskAdded }: TAddTaskProps) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = taskSchema.safeParse({ title });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setError(null);

    try {
      await addTaskToApi(validationResult.data.title);

      setTitle("");
      setShowPopup(true);

      onTaskAdded();

      setTimeout(() => setShowPopup(false), 2000);
    } catch (err: any) {
      console.error("Error adding task:", err);
      setError(err.message);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center mb-6 max-w-md mx-auto"
      >
        <div className="w-full relative">
          {error && (
            <p className="text-red-500 text-sm mb-1 absolute top-[-20px] left-0">
              {error}
            </p>
          )}
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
