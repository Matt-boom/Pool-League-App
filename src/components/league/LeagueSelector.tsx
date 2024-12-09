import React from 'react';
import { Trophy } from 'lucide-react';
import { League } from '../../types/league';

interface Props {
  leagues: League[];
  selectedLeague: League | null;
  onLeagueSelect: (league: League) => void;
}

export const LeagueSelector: React.FC<Props> = ({ leagues, selectedLeague, onLeagueSelect }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-semibold">Select League</h2>
      </div>
      <div className="flex space-x-4">
        {leagues.map(league => (
          <button
            key={league.id}
            onClick={() => onLeagueSelect(league)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLeague?.id === league.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {league.name}
          </button>
        ))}
      </div>
    </div>
  );
};