import { ITask } from "@/shared/typedefs";

export interface IEditTaskProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: ITask) => void;
}
