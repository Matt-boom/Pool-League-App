import React, { useState, useEffect } from 'react';
import { LeagueTable } from './LeagueTable';
import { FixtureCalendar } from '../fixtures/FixtureCalendar';
import { PlayerStats } from '../players/PlayerStats';
import { League } from '../../types/league';
import { Team, Player, Match, Frame } from '../../types';
import { getLeagueData, updateLeagueData } from '../../utils/storage';
import { updateLeagueTable } from '../../utils/leagueUtils';

interface Props {
  league: League;
}

export const LeagueOverview: React.FC<Props> = ({ league }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const { teams: leagueTeams, players: leaguePlayers, matches: leagueMatches } = getLeagueData(league.id);
    const updatedTeams = updateLeagueTable(leagueTeams, leagueMatches);
    setTeams(updatedTeams);
    setPlayers(leaguePlayers);
    setMatches(leagueMatches);
  }, [league]);

  const handleMatchUpdate = (match: Match, frames: Frame[], homePlayer: Player, awayPlayer: Player) => {
    const homeScore = frames.filter(f => f.winner === 'home').length;
    const awayScore = frames.filter(f => f.winner === 'away').length;

    const updatedMatch: Match = {
      ...match,
      homeScore,
      awayScore,
      isCompleted: true,
      homePlayer,
      awayPlayer
    };

    const updatedMatches = matches.map(m => 
      m.id === match.id ? updatedMatch : m
    );

    const updatedTeams = updateLeagueTable(teams, updatedMatches);
    
    // Update players list with new statistics
    const existingHomePlayers = players.filter(p => p.id !== homePlayer.id);
    const existingAwayPlayers = existingHomePlayers.filter(p => p.id !== awayPlayer.id);
    const updatedPlayers = [...existingAwayPlayers, homePlayer, awayPlayer];

    // Update state and storage
    setMatches(updatedMatches);
    setPlayers(updatedPlayers);
    setTeams(updatedTeams);

    updateLeagueData(league.id, {
      matches: updatedMatches,
      players: updatedPlayers,
      teams: updatedTeams
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{league.name} League Table</h2>
        <LeagueTable teams={teams} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fixtures</h2>
        <FixtureCalendar 
          matches={matches}
          onMatchUpdate={handleMatchUpdate}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Rankings</h2>
        <PlayerStats players={players} />
      </section>
    </div>
  );
};