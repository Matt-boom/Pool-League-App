import { useState, useEffect } from 'react';
import { League, LeagueStats } from '../types/league';
import { Team, Player, Match } from '../types';
import { getLeagueData } from '../utils/storage';
import { calculateLeagueStats } from '../utils/leagueUtils';

interface UseLeagueDataReturn {
  league: League | null;
  teams: Team[];
  players: Player[];
  matches: Match[];
  stats: LeagueStats | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useLeagueData = (leagueId: string): UseLeagueDataReturn => {
  const [league, setLeague] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [stats, setStats] = useState<LeagueStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = getLeagueData(leagueId);
      
      if (!data.league) {
        throw new Error('League not found');
      }

      setLeague(data.league);
      setTeams(data.teams);
      setPlayers(data.players);
      setMatches(data.matches);
      setStats(calculateLeagueStats(data.league, data.teams, data.matches, data.players));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load league data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [leagueId]);

  return {
    league,
    teams,
    players,
    matches,
    stats,
    isLoading,
    error,
    refreshData: fetchData
  };
};