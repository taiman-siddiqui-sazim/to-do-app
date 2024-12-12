import { ReactNode } from "react";
export interface ITask {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface IHomePageLayoutProps {
    children: ReactNode; 
  }
  