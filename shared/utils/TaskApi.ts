import axios from "axios";
import { API_BASE_URL, ITask } from "@/shared/typedefs";

export const addTaskToApi = async (title: string): Promise<ITask> => {
  const payload = {
    task: { title, completed: false },
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}`, payload);
    if (response.status === 201) {
      return response.data.data;
    }
    throw new Error("Failed to add task");
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || "Failed to add task.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error("An error occurred while setting up the request.");
    }
  }
};

export const fetchTasksFromApi = async (taskId?: number): Promise<ITask | ITask[]> => {
  try {
    const url = taskId ? `${API_BASE_URL}/${taskId}` : API_BASE_URL;
    const response = await axios.get(url as string);
    
    if (response.status === 200) {
      return taskId ? response.data.data as ITask : response.data.data as ITask[];
    }
    throw new Error("Failed to fetch tasks");
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || "Failed to fetch tasks.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error("An error occurred while setting up the request.");
    }
  }
};

export const updateTaskInApi = async (
  taskId: number,
  title: string
): Promise<ITask> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${taskId}`, {
      task: { title }, 
    });

    if (response.status === 200) {
      return response.data.data as ITask; 
    }

    throw new Error("Failed to update task.");
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || "Failed to update task.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error("An error occurred while setting up the request.");
    }
  }
};

export const deleteTaskFromApi = async (taskId: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
    if (response.status !== 204 && response.status !== 200) {
      throw new Error("Failed to delete task");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || "Failed to delete task.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error("An error occurred while sending the request.");
    }
  }
};