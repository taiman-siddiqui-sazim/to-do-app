import axios from "axios";
import { API_BASE_URL, ITask } from "@/shared/typedefs";

export const addTaskToApi = async (title: string) => {
  const payload = {
    task: { title, completed: false },
  };

  try {
    const response = await axios.post(`${API_BASE_URL}`, payload);
    if (response.status === 201) {
      return response.data; 
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

export const fetchTasksFromApi = async (): Promise<ITask[]> => {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.status === 200) {
        return response.data.data; // Assuming the API returns tasks under `data`
      }
      throw new Error("Failed to fetch tasks");
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      throw new Error(
        error.response?.data?.error || "An error occurred while fetching tasks"
      );
    }
  };
  