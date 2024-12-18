import { ITask } from "@/shared/typedefs";

export type TTaskListProps = {
  updatedTask?: ITask; 
  onDeleteTask: (taskId: number) => void;
  onUpdateTask: (task: ITask) => void;
};
