import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Calendar } from 'lucide-react';
import { useTeamData } from '../hooks/useTeamData';
import { PlayerStats } from '../components/players/PlayerStats';
import { TeamFixtures } from '../components/team/TeamFixtures';
import { TeamStats } from '../components/team/TeamStats';
import { TeamLeaderboard } from '../components/team/TeamLeaderboard';

export const TeamPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { team, players, matches, isLoading, error } = useTeamData(teamId!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Team</h2>
        <p className="text-gray-600 mb-6">{error || 'Team not found'}</p>
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to League Overview
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to League Overview
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{team.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
            <Trophy className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Points</p>
              <p className="text-2xl font-bold text-blue-900">{team.points}</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg flex items-center">
            <Users className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-green-600">Players</p>
              <p className="text-2xl font-bold text-green-900">{players.length}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg flex items-center">
            <Calendar className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-purple-600">Matches</p>
              <p className="text-2xl font-bold text-purple-900">{matches.length}</p>
            </div>
          </div>
        </div>

        <TeamStats team={team} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Players</h2>
          <PlayerStats players={players} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Matches</h2>
          <TeamFixtures matches={matches} />
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Rankings</h2>
        <TeamLeaderboard players={players} />
      </section>
    </div>
  );
};