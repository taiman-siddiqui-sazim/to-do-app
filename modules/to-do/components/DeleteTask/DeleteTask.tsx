import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/shared/components/ui";
  import { Button } from "@/shared/components/ui";
  import { IDeleteTaskProps } from "./DeleteTask.interfaces";
  
  export const DeleteTask = ({
    taskTitle,
    isOpen,
    onClose,
    onDelete,
  }: IDeleteTaskProps) => {
    if (!isOpen) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="bg-gray-700">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription className="text-white">
              Are you sure you want to delete the task "{taskTitle}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="bg-gray-600 text-white hover:bg-gray-500">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  