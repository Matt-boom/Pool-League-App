import { Team, Match, Player } from '../types';
import { League, LeagueStats } from '../types/league';

export const calculateTeamStats = (team: Team, matches: Match[]): Team => {
  const teamMatches = matches.filter(
    m => (m.homeTeam.id === team.id || m.awayTeam.id === team.id) && m.isCompleted
  );

  const stats = teamMatches.reduce(
    (acc, match) => {
      const isHome = match.homeTeam.id === team.id;
      const teamScore = isHome ? match.homeScore : match.awayScore;
      const oppositionScore = isHome ? match.awayScore : match.homeScore;

      return {
        played: acc.played + 1,
        won: acc.won + (teamScore > oppositionScore ? 1 : 0),
        lost: acc.lost + (teamScore < oppositionScore ? 1 : 0),
        framesFor: acc.framesFor + teamScore,
        framesAgainst: acc.framesAgainst + oppositionScore,
      };
    },
    { played: 0, won: 0, lost: 0, framesFor: 0, framesAgainst: 0 }
  );

  return {
    ...team,
    ...stats,
    points: stats.won * 2, // 2 points per win
  };
};

export const updateLeagueTable = (teams: Team[], matches: Match[]): Team[] => {
  const updatedTeams = teams.map(team => calculateTeamStats(team, matches));

  // Sort teams by points, then frame difference, then frames for
  return updatedTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const aFrameDiff = a.framesFor - a.framesAgainst;
    const bFrameDiff = b.framesFor - b.framesAgainst;
    if (bFrameDiff !== aFrameDiff) return bFrameDiff - aFrameDiff;
    return b.framesFor - a.framesFor;
  });
};

export const calculateLeagueStats = (
  league: League,
  teams: Team[],
  matches: Match[],
  players: Player[]
): LeagueStats => {
  const completedMatches = matches.filter(m => m.isCompleted);
  const totalFrames = completedMatches.reduce((sum, match) => 
    sum + match.homeScore + match.awayScore, 0
  );

  // Find top scorer
  const topScorer = players.reduce((top, player) => {
    if (player.framesWon > (top?.framesWon || 0)) {
      return {
        playerId: player.id,
        playerName: player.name,
        framesWon: player.framesWon
      };
    }
    return top;
  }, undefined as { playerId: string; playerName: string; framesWon: number } | undefined);

  return {
    totalTeams: teams.length,
    totalPlayers: players.length,
    totalMatches: matches.length,
    completedMatches: completedMatches.length,
    averageFramesPerMatch: completedMatches.length > 0 
      ? totalFrames / completedMatches.length 
      : 0,
    topScorer
  };
};

export const getTeamPerformanceTrend = (team: Team, matches: Match[]): 'up' | 'down' | 'stable' => {
  const teamMatches = matches
    .filter(m => (m.homeTeam.id === team.id || m.awayTeam.id === team.id) && m.isCompleted)
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    .slice(0, 5); // Last 5 matches

  if (teamMatches.length < 2) return 'stable';

  const recentWins = teamMatches.slice(0, 2).filter(m => {
    const isHome = m.homeTeam.id === team.id;
    return isHome ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
  }).length;

  const previousWins = teamMatches.slice(-2).filter(m => {
    const isHome = m.homeTeam.id === team.id;
    return isHome ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
  }).length;

  if (recentWins > previousWins) return 'up';
  if (recentWins < previousWins) return 'down';
  return 'stable';
};