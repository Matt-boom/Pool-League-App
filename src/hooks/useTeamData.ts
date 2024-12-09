import { useState, useEffect } from 'react';
import { Team, Player, Match } from '../types';
import { getStoredData } from '../utils/storage';

export const useTeamData = (teamId: string) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        
        const { teams, players, matches } = getStoredData();

        const teamData = teams.find((t: Team) => t.id === teamId);
        if (!teamData) {
          throw new Error('Team not found');
        }

        const teamPlayers = players.filter((p: Player) => p.teamId === teamId);
        const teamMatches = matches.filter((m: Match) => 
          m.homeTeam.id === teamId || m.awayTeam.id === teamId
        );

        setTeam(teamData);
        setPlayers(teamPlayers);
        setMatches(teamMatches);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load team data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  return { team, players, matches, isLoading, error };
};