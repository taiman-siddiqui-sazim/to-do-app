import axios from "axios";
import { API_BASE_URL, ITask } from "@/shared/typedefs";

export const addTaskToApi = async (title: string) => {
  const payload = {
    task: { title, completed: false },
  };

  try {
    const response = await axios.post(`${API_BASE_URL}`, payload);
    if (response.status === 201) {
      return response.data.data; 
    }
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
      const url = taskId ? `${API_BASE_URL}/${taskId}` : API_BASE_URL; // Conditional endpoint
      const response = await axios.get(url);
  
      if (response.status === 200) {
        return taskId ? response.data.data as ITask : response.data.data as ITask[]; // Explicit typing
      }
      throw new Error("Failed to fetch tasks");
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      throw new Error(
        error.response?.data?.error || "An error occurred while fetching tasks"
      );
    }
  };  
  
  export const deleteTaskFromApi = async (taskId: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`);
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
  