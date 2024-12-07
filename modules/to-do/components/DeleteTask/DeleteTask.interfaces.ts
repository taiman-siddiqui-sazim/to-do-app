export interface IDeleteTaskProps {
    taskTitle: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }