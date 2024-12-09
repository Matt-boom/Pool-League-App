import React from 'react';
import { Match } from '../../types';
import { Trophy, Calendar } from 'lucide-react';

interface Props {
  matches: Match[];
}

export const TeamFixtures: React.FC<Props> = ({ matches }) => {
  const sortedMatches = [...matches].sort((a, b) => 
    new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {sortedMatches.map((match) => (
          <li key={match.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{match.date ? new Date(match.date).toLocaleDateString() : 'Date TBD'}</span>
              </div>
              {match.isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{match.homeTeam.name}</p>
                {match.homePlayer && (
                  <p className="text-sm text-gray-500">{match.homePlayer.name}</p>
                )}
              </div>
              
              <div className="px-4 text-center">
                <p className="text-lg font-bold text-gray-900">
                  {match.isCompleted ? `${match.homeScore} - ${match.awayScore}` : 'vs'}
                </p>
              </div>
              
              <div className="flex-1 text-right">
                <p className="font-medium text-gray-900">{match.awayTeam.name}</p>
                {match.awayPlayer && (
                  <p className="text-sm text-gray-500">{match.awayPlayer.name}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};