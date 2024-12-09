import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Match, Frame, Player } from '../../types';
import { MatchScoreCard } from '../matches/MatchScoreCard';

interface Props {
  matches: Match[];
  onMatchUpdate: (match: Match, frames: Frame[], homePlayer: Player, awayPlayer: Player) => void;
}

export const FixtureCalendar: React.FC<Props> = ({ matches, onMatchUpdate }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const maxWeeks = Math.max(...matches.map(m => m.week), 1);

  const weekMatches = matches.filter(match => match.week === currentWeek);

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => Math.max(1, prev - 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => Math.min(maxWeeks, prev + 1));
  };

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleScoreUpdate = (frames: Frame[], homePlayer: Player, awayPlayer: Player) => {
    if (selectedMatch) {
      onMatchUpdate(selectedMatch, frames, homePlayer, awayPlayer);
      setSelectedMatch(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Week {currentWeek} Fixtures</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousWeek}
                disabled={currentWeek === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextWeek}
                disabled={currentWeek === maxWeeks}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {weekMatches.map(match => (
            <div 
              key={match.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleMatchSelect(match)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-right">
                  <span className="font-medium">{match.homeTeam.name}</span>
                </div>
                <div className="px-4 text-center">
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded">
                    {match.isCompleted 
                      ? `${match.homeScore} - ${match.awayScore}`
                      : 'vs'
                    }
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-medium">{match.awayTeam.name}</span>
                </div>
              </div>
              {match.isCompleted && (
                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  <span>{match.homePlayer?.name}</span>
                  <span>{match.awayPlayer?.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedMatch && (
        <div className="mt-4">
          <MatchScoreCard
            match={selectedMatch}
            onClose={() => setSelectedMatch(null)}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
      )}
    </div>
  );
};