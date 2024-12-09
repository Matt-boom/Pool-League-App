import { useState, useEffect } from 'react';
import { uploadTeams } from '../services/api';
import { API_CONFIG } from '../config/constants';
import { Team } from '../types';
import { getStoredData } from '../utils/storage';
import { initializeMockData } from '../services/mockApi';

interface UseUploadReturn {
  file: File | null;
  error: string | null;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  isTestMode: boolean;
  teams: Team[];
}

export const useUpload = (): UseUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const isTestMode = API_CONFIG.MOCK_API;

  // Initialize teams from storage or mock data
  useEffect(() => {
    const { teams: storedTeams } = getStoredData();
    if (storedTeams.length === 0 && isTestMode) {
      const mockTeams = initializeMockData();
      setTeams(mockTeams);
    } else {
      setTeams(storedTeams);
    }
  }, [isTestMode]);

  const validateFile = (selectedFile: File): boolean => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '', // Allow empty MIME type for some browsers
    ];
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf('.'));
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedExtensions.includes(fileExtension)) {
      setError('Please upload an Excel file (.xlsx, .xls)');
      return false;
    }

    if (!allowedTypes.includes(selectedFile.type) && selectedFile.type !== '') {
      setError('Please upload an Excel file (.xlsx, .xls)');
      return false;
    }

    if (selectedFile.size > maxSize) {
      setError('File is too large. Maximum file size is 5MB.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file && !isTestMode) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const response = await uploadTeams(file!);
      const { teams: storedTeams } = getStoredData();
      setTeams(storedTeams);
      setFile(null);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = String(err.message);
      }
      
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    error,
    isUploading,
    handleFileChange,
    handleUpload,
    isTestMode,
    teams,
  };
};