import React from 'react';
import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { LeagueStats } from '../../types/league';

interface Props {
  stats: LeagueStats;
}

export const LeagueStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Teams</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
          </div>
          <Users className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Players</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalPlayers}</p>
          </div>
          <Users className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Matches Played</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.completedMatches}/{stats.totalMatches}
            </p>
          </div>
          <Calendar className="w-8 h-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Top Scorer</p>
            {stats.topScorer ? (
              <>
                <p className="text-lg font-bold text-gray-900">{stats.topScorer.playerName}</p>
                <p className="text-sm text-gray-500">{stats.topScorer.framesWon} frames won</p>
              </>
            ) : (
              <p className="text-lg font-bold text-gray-500">No data</p>
            )}
          </div>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="col-span-full">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium">League Statistics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Average Frames/Match</p>
              <p className="text-lg font-semibold">
                {stats.averageFramesPerMatch.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-lg font-semibold">
                {((stats.completedMatches / stats.totalMatches) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Players per Team</p>
              <p className="text-lg font-semibold">
                {(stats.totalPlayers / stats.totalTeams).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};