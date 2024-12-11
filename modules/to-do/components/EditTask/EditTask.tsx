import { useState } from "react";
import { Button, Textarea } from "@/shared/components/ui";
import { IEditTaskProps } from "./EditTask.interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui";
import { HTaskSchema } from "@/shared/typedefs";

export const EditTask = ({ task, isOpen, onClose, onSave }: IEditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const validationResult = HTaskSchema.safeParse({ title });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setError(null);
    onSave({ ...task, title: validationResult.data.title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full bg-gray-800 text-white max-h-[80vh] overflow-hidden sm:rounded-lg p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-blue-300 border-b border-gray-700 pb-2">
            Edit Task
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-200">
            Modify the task details below.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 rounded max-h-[20rem] overflow-y-auto scrollbar-thick scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Textarea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Update task details"
            className="bg-gray-200 text-gray-900 font-bold min-h-[60px] max-h-[80px] resize-y"
          />
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-500 px-4 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-800 text-white hover:bg-blue-700 px-5 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
