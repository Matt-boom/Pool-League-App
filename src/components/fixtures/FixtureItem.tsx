import React from 'react';
import { Trophy } from 'lucide-react';
import { Match } from '../../types';

interface Props {
  match: Match;
  onScoreUpdate: (matchId: string, homeScore: number, awayScore: number) => void;
  onMatchSelect: (match: Match) => void;
}

export const FixtureItem: React.FC<Props> = ({ match, onScoreUpdate, onMatchSelect }) => {
  const handleScoreChange = (isHome: boolean, value: string) => {
    const numValue = value === '' ? 0 : Math.min(10, Math.max(0, parseInt(value) || 0));
    onScoreUpdate(match.id, 
      isHome ? numValue : match.homeScore,
      isHome ? match.awayScore : numValue
    );
  };

  return (
    <li className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        {match.isCompleted && <Trophy className="text-yellow-500" size={20} />}
        <span className="text-gray-600">{match.date || 'Date TBD'}</span>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <span className="font-medium w-1/3 text-right">{match.homeTeam.name}</span>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={match.homeScore}
            onChange={(e) => handleScoreChange(true, e.target.value)}
            className="w-12 text-center border rounded p-1"
            min="0"
            max="10"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={match.awayScore}
            onChange={(e) => handleScoreChange(false, e.target.value)}
            className="w-12 text-center border rounded p-1"
            min="0"
            max="10"
          />
        </div>
        <span className="font-medium w-1/3">{match.awayTeam.name}</span>
      </div>
      {!match.isCompleted && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onMatchSelect(match)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Enter Full Scorecard
          </button>
        </div>
      )}
    </li>
  );
};