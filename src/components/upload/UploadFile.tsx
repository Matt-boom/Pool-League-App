import React from 'react';
import { Upload } from 'lucide-react';
import { useUpload } from '../../hooks/useUpload';
import { LeagueTable } from '../league/LeagueTable';

export const UploadFile: React.FC = () => {
  const { 
    file, 
    error, 
    isUploading, 
    isTestMode, 
    teams,
    handleFileChange, 
    handleUpload 
  } = useUpload();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-4">
          {isTestMode && (
            <div className="p-3 text-sm text-blue-600 bg-blue-50 rounded">
              Running in test mode with sample data.
            </div>
          )}
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Excel files only (max 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isTestMode ? 'Load Test Data' : (isUploading ? 'Uploading...' : 'Upload')}
            </button>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      {teams.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">League Table</h2>
          <LeagueTable teams={teams} />
        </div>
      )}
    </div>
  );
};