import React, { useState } from 'react';
import { FixtureCalendarView } from '../fixtures/FixtureCalendarView';
import { MatchScoreCard } from '../matches/MatchScoreCard';
import { useFixtures } from '../../hooks/useFixtures';
import { Match, Frame, Player } from '../../types';

interface Props {
  matches: Match[];
  onMatchUpdate: (match: Match, frames: Frame[], homePlayer: Player, awayPlayer: Player) => void;
}

export const LeagueFixtures: React.FC<Props> = ({ matches, onMatchUpdate }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { currentWeek, totalWeeks, setCurrentWeek, weekMatches } = useFixtures(matches);

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
    <div className="space-y-6">
      <FixtureCalendarView
        matches={matches}
        currentWeek={currentWeek}
        totalWeeks={totalWeeks}
        onWeekChange={setCurrentWeek}
        onMatchSelect={handleMatchSelect}
      />

      {selectedMatch && (
        <MatchScoreCard
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onScoreUpdate={handleScoreUpdate}
        />
      )}
    </div>
  );
};