import { ITask } from "@/shared/typedefs";

export type TTaskListProps = {
  tasks: ITask[];
  onUpdateTask: (updatedTask: ITask) => void;
};
