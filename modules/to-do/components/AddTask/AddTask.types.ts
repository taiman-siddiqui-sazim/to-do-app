import { ITask } from "@/shared/typedefs";

export type TAddTaskProps = {
  onTaskAdded: (task: ITask) => void;
};
