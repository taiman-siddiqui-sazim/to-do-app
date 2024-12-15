import { ITask } from "@/shared/typedefs";

export type TTaskListProps = {
  tasks: ITask[];
  onUpdateTask: (task: ITask) => void;
  onDeleteTask: (taskId: number) => void; 
};
