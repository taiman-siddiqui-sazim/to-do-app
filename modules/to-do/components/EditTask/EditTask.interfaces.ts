import { ITask } from "@/shared/typedefs";

export interface IEditTaskProps {
  task: ITask;                     
  isOpen: boolean;                
  onClose: () => void;             
  onTaskUpdated: (task: ITask) => void; 
}
