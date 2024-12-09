import React from 'react';
import { Team } from '../../types';
import { Trophy, XCircle } from 'lucide-react';

interface Props {
  team: Team;
}

export const TeamStats: React.FC<Props> = ({ team }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Matches Played</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{team.played}</p>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-600">Matches Won</span>
          <Trophy className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-green-900">{team.won}</p>
      </div>

      <div className="p-4 bg-red-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-600">Matches Lost</span>
          <XCircle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-2xl font-bold text-red-900">{team.lost}</p>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">Frame Difference</span>
        </div>
        <p className="text-2xl font-bold text-blue-900">{team.framesFor - team.framesAgainst}</p>
      </div>
    </div>
  );
};