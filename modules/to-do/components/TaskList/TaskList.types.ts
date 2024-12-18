import { ITask } from "@/shared/typedefs";

export type TTaskListProps = {
  singleTask: ITask | null; 
  onUpdateTask: (task: ITask) => void; 
  onDeleteTask: (taskId: number) => void; 
};
