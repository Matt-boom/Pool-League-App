import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';

interface Props {
  matches: Match[];
  currentWeek: number;
  totalWeeks: number;
  onWeekChange: (week: number) => void;
  onMatchSelect: (match: Match) => void;
}

export const FixtureCalendarView: React.FC<Props> = ({
  matches,
  currentWeek,
  totalWeeks,
  onWeekChange,
  onMatchSelect
}) => {
  const weekMatches = matches.filter(match => match.week === currentWeek);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Week {currentWeek} Fixtures</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onWeekChange(currentWeek - 1)}
            disabled={currentWeek === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            Week {currentWeek} of {totalWeeks}
          </span>
          <button
            onClick={() => onWeekChange(currentWeek + 1)}
            disabled={currentWeek === totalWeeks}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {weekMatches.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            onClick={() => onMatchSelect(match)}
          />
        ))}
        {weekMatches.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No fixtures scheduled for this week</p>
          </div>
        )}
      </div>
    </div>
  );
};