import React from 'react';
import { Link } from 'react-router-dom';
import { Team } from '../../types';
import { ChevronRight } from 'lucide-react';

interface Props {
  teams: Team[];
}

export const LeagueTable: React.FC<Props> = ({ teams }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Played</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lost</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Frames For</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Frames Against</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Frame Difference</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teams.map((team, index) => (
            <tr key={team.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{team.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.played}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.won}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.lost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.framesFor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.framesAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.framesFor - team.framesAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{team.points}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/team/${team.id}`}
                  className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                >
                  View Team
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};