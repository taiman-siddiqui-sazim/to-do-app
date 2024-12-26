export interface IDeleteTaskProps {
  taskId: number; 
  taskTitle: string; 
  isOpen: boolean; 
  onClose: () => void; 
  onDelete: (taskId: number) => void; 
}
