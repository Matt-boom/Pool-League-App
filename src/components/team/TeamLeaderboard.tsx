import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Player } from '../../types';

interface Props {
  players: Player[];
}

export const TeamLeaderboard: React.FC<Props> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.framesWon - a.framesWon);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Team Leaderboard</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              {index === 0 && <Medal className="w-5 h-5 text-yellow-500" />}
              {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
              {index === 2 && <Medal className="w-5 h-5 text-amber-600" />}
              <div>
                <p className="font-medium text-gray-900">{player.name}</p>
                <p className="text-sm text-gray-500">
                  {player.framesWon} frames won ({player.winPercentage.toFixed(1)}% win rate)
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Matches: {player.played}
              </p>
              <p className="text-sm text-gray-500">
                W: {player.won} L: {player.lost}
              </p>
            </div>
          </div>
        ))}
        {players.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No players have recorded matches yet
          </div>
        )}
      </div>
    </div>
  );
};