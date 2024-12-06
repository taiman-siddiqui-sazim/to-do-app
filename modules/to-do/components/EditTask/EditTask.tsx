import { useState } from "react";
import { Input, Button } from "@/shared/components/ui";
import { IEditTaskProps } from "./EditTask.interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui";

export const EditTask = ({ task, isOpen, onClose, onSave }: IEditTaskProps) => {
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ ...task, title });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-800">
        <DialogHeader>
          
          <DialogTitle className="text-blue-500 border-black">Edit Task</DialogTitle>
          <DialogDescription className="text-white">
            Modify the task title below.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Update task title"
          className="mb-4 text-black font-bold bg-gray-300 border-black"
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-500 border-black text-sm px-4 py-2"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSave}
            className="bg-blue-800 text-white hover:bg-blue-700 border-black text-base px-5 py-3"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
