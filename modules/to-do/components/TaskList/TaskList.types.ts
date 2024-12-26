import { ITask } from "@/shared/typedefs";

export type TTaskListProps = {
  updatedTask?: ITask; 
  deletedTaskId?: number; 
  onDeleteTask: (taskId: number) => void;
  onUpdateTask: (task: ITask) => void;
};
