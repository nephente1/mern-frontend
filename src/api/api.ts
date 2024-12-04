import axios from 'axios';
import axiosInstance from "./axiosInstance";

export interface WorkoutTypes {
  title: string;
  load: number;
  reps: number;
  date?: Date | string
}

export interface BackendError {
  error: string;
  emptyFields: string[];
}

export const fetchWorkouts = async () => {
  try{
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.log("Error:", error.response.data)
    throw new Error(`Unexpected error occurred ${error}`);
  }
  
}

export const createItemFetchRequest = async (item: WorkoutTypes): Promise<any> => {

  try {
    const response = await axiosInstance.post('/', item);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Obsługa błędu z backendu
      const backendError = error.response?.data as BackendError;
      console.error('Backend error:', backendError);

      throw backendError; // Rzucamy błąd do wyższej warstwy
    } else {
      // Obsługa innych typów błędów
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};

export const deleteDataFetch = async(id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response.data)
  }
}

export const patchDataFetch = async(id: string, objToSend: WorkoutTypes) => {
  try {
    const response = await axiosInstance.patch(`/${id}`, objToSend);
    return response.data;
  } catch (error) {
    console.log("Error:", error.response.data)
  }
};
