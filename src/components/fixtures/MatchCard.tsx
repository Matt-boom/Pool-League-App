import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { Match } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface Props {
  match: Match;
  onClick: () => void;
}

export const MatchCard: React.FC<Props> = ({ match, onClick }) => {
  const {
    date,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isCompleted,
    homePlayer,
    awayPlayer
  } = match;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            {date ? formatDate(date) : 'Date TBD'}
          </span>
          {isCompleted ? (
            <Trophy className="w-5 h-5 text-yellow-500" />
          ) : (
            <Clock className="w-5 h-5 text-blue-500" />
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-gray-900">{homeTeam.name}</p>
            {homePlayer && (
              <p className="text-sm text-gray-500">{homePlayer.name}</p>
            )}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
              {isCompleted ? (
                <span className="text-lg font-bold">
                  {homeScore} - {awayScore}
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-500">vs</span>
              )}
            </div>
          </div>

          <div className="text-left">
            <p className="font-medium text-gray-900">{awayTeam.name}</p>
            {awayPlayer && (
              <p className="text-sm text-gray-500">{awayPlayer.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};