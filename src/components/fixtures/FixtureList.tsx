import React from 'react';
import { Match } from '../../types';
import { FixtureItem } from './FixtureItem';

interface Props {
  matches: Match[];
  currentWeek: number;
  onScoreUpdate: (matchId: string, homeScore: number, awayScore: number) => void;
  onMatchSelect: (match: Match) => void;
}

export const FixtureList: React.FC<Props> = ({ matches, currentWeek, onScoreUpdate, onMatchSelect }) => {
  const weekMatches = matches.filter(match => match.week === currentWeek);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Week {currentWeek} Fixtures</h2>
      <ul className="space-y-4">
        {weekMatches.map(match => (
          <FixtureItem
            key={match.id}
            match={match}
            onScoreUpdate={onScoreUpdate}
            onMatchSelect={onMatchSelect}
          />
        ))}
      </ul>
    </div>
  );
};