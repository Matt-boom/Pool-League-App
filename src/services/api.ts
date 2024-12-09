import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../types';
import { mockUploadTeams } from './mockApi';
import { API_CONFIG } from '../config/constants';

const api = axios.create({
  baseURL: API_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadTeams = async (file: File): Promise<ApiResponse<{ leagues: Record<string, string[]> }>> => {
  // Use mock API in development/test mode
  if (API_CONFIG.MOCK_API) {
    return mockUploadTeams(file);
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<ApiResponse<{ leagues: Record<string, string[]> }>>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred during upload');
  }
};