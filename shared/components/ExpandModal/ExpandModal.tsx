import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/components/ui";
import { IExpandModalProps } from "./ExpandModal.interfaces";

export const ExpandModal = ({ content, title, onClose }: IExpandModalProps) => {
  return (
    <Dialog
      open={Boolean(content)}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose(); 
      }}
      modal
    >
      <DialogContent
        className="max-w-full sm:max-w-lg w-full bg-gray-800 text-white max-h-[80vh] overflow-hidden sm:rounded-lg p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-blue-300">{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4 bg-gray-200 rounded max-h-[20rem] overflow-y-auto scrollbar-thick scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <p className="text-gray-900 whitespace-pre-wrap break-words">{content}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-500 px-4 py-2 rounded"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
