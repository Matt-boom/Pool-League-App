import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Team, Match } from '../../types';
import { generateFixtures, convertRoundsToMatches } from '../../utils/fixtureGenerator';
import { updateStoredData, getStoredData } from '../../utils/storage';

interface Props {
  teams: Team[];
  onFixturesGenerated: () => void;
}

export const FixtureGenerator: React.FC<Props> = ({ teams, onFixturesGenerated }) => {
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFixtures = () => {
    try {
      const rounds = generateFixtures(teams);
      const matches = convertRoundsToMatches(rounds);
      
      // Store the generated matches
      const storedData = getStoredData();
      updateStoredData({
        ...storedData,
        matches
      });
      
      onFixturesGenerated();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate fixtures');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Fixture Generation</h2>
        </div>
        <button
          onClick={handleGenerateFixtures}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Fixtures
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>This will generate a complete fixture list where:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Each team plays every other team twice (home and away)</li>
          <li>First half fixtures are mirrored in the second half</li>
          <li>Fixtures are balanced across the season</li>
        </ul>
      </div>
    </div>
  );
};