import React from 'react';
import { Database } from 'lucide-react';
import { generateTestData } from '../../data/testData';
import { updateStoredData } from '../../utils/storage';

export const TestDataButton: React.FC = () => {
  const handleGenerateTestData = () => {
    const testData = generateTestData();
    updateStoredData(testData);
    window.location.reload(); // Refresh to show new data
  };

  return (
    <button
      onClick={handleGenerateTestData}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Database className="w-5 h-5 mr-2" />
      Load Test Data
    </button>
  );
};