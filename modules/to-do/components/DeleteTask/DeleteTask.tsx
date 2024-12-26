import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui";
import { Button, Textarea } from "@/shared/components/ui";
import { IDeleteTaskProps } from "./DeleteTask.interfaces";
import { deleteTaskFromApi } from "@/shared/utils/TaskApi";

export const DeleteTask = ({
  taskId,
  taskTitle,
  isOpen,
  onClose,
  onDelete,
}: IDeleteTaskProps) => {
  const handleDelete = async () => {
    try {
      await deleteTaskFromApi(taskId); 
      onDelete(taskId); 
      onClose(); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full bg-gray-800 text-white max-h-[80vh] overflow-hidden sm:rounded-lg p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-red-500 border-b border-gray-700 pb-2">
            Delete Task
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-100 mb-4">
            Are you sure you want to delete the task? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 rounded max-h-[20rem] overflow-y-auto scrollbar-thick scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <Textarea
            value={taskTitle}
            readOnly
            placeholder="Task details will be shown here"
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
            onClick={handleDelete}
            className="bg-red-700 text-white hover:bg-red-500 px-5 py-2 rounded"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
