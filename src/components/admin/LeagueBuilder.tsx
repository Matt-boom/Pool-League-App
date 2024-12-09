import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { buildLeagues } from '../../services/leagueBuilder';
import { updateStoredData, getStoredData } from '../../utils/storage';
import { LeagueDivision } from '../../types/league';

export const LeagueBuilder: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleBuildLeagues = () => {
    try {
      const { teams: existingTeams } = getStoredData();
      
      // Group teams by league
      const leagueData: Record<LeagueDivision, string[]> = {
        Prem: [],
        Div1: [],
        Div2: [],
        Div3: []
      };

      existingTeams.forEach(team => {
        if (team.league) {
          leagueData[team.league as LeagueDivision].push(team.name);
        }
      });

      // Build leagues and fixtures
      const { leagues, teams, matches } = buildLeagues(leagueData);

      // Update storage with new league structure
      updateStoredData({
        leagues,
        teams,
        matches,
        players: [] // Reset players for new season
      });

      setError(null);
      window.location.reload(); // Refresh to show new leagues
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to build leagues');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">League Builder</h2>
        </div>
        <button
          onClick={handleBuildLeagues}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Build Leagues
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 text-red-700 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>This will create separate leagues with:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Premier League, Division 1, Division 2, and Division 3</li>
          <li>Separate fixtures for each league</li>
          <li>Individual league tables</li>
          <li>Player rankings per league</li>
        </ul>
      </div>
    </div>
  );
};