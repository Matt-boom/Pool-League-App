import React from 'react';
import { Shield } from 'lucide-react';
import { TestDataButton } from './TestDataButton';
import { FixtureGenerator } from '../fixtures/FixtureGenerator';
import { getStoredData } from '../../utils/storage';

export const AdminPanel: React.FC = () => {
  const { teams } = getStoredData();

  const handleFixturesGenerated = () => {
    // Refresh the page to show new fixtures
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <TestDataButton />
      </div>

      <FixtureGenerator 
        teams={teams} 
        onFixturesGenerated={handleFixturesGenerated} 
      />
    </div>
  );
};