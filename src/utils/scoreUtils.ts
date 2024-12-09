import { Match, Frame, Player, Team } from '../types';
import { getStoredData, updateStoredData } from './storage';

export const updateMatchScores = (
  match: Match,
  frames: Frame[],
  homePlayer: Player,
  awayPlayer: Player
): void => {
  const { matches, teams, players } = getStoredData();

  // Calculate match scores
  const homeScore = frames.filter(f => f.winner === 'home').length;
  const awayScore = frames.filter(f => f.winner === 'away').length;

  // Update match
  const updatedMatch: Match = {
    ...match,
    homeScore,
    awayScore,
    isCompleted: true,
    homePlayer,
    awayPlayer,
    frames
  };

  // Update matches array
  const updatedMatches = matches.map(m => 
    m.id === match.id ? updatedMatch : m
  );

  // Update team statistics
  const updatedTeams = teams.map(team => {
    if (team.id === match.homeTeam.id) {
      return {
        ...team,
        played: team.played + 1,
        won: homeScore > awayScore ? team.won + 1 : team.won,
        lost: homeScore < awayScore ? team.lost + 1 : team.lost,
        framesFor: team.framesFor + homeScore,
        framesAgainst: team.framesAgainst + awayScore,
        points: team.points + (homeScore > awayScore ? 2 : 0)
      };
    }
    if (team.id === match.awayTeam.id) {
      return {
        ...team,
        played: team.played + 1,
        won: awayScore > homeScore ? team.won + 1 : team.won,
        lost: awayScore < homeScore ? team.lost + 1 : team.lost,
        framesFor: team.framesFor + awayScore,
        framesAgainst: team.framesAgainst + homeScore,
        points: team.points + (awayScore > homeScore ? 2 : 0)
      };
    }
    return team;
  });

  // Update or add players
  const existingPlayers = players.filter(p => 
    p.id !== homePlayer.id && p.id !== awayPlayer.id
  );

  const updatedPlayers = [
    ...existingPlayers,
    {
      ...homePlayer,
      played: (homePlayer.played || 0) + 1,
      won: homeScore > awayScore ? (homePlayer.won || 0) + 1 : homePlayer.won || 0,
      lost: homeScore < awayScore ? (homePlayer.lost || 0) + 1 : homePlayer.lost || 0,
      framesWon: (homePlayer.framesWon || 0) + homeScore,
      framesLost: (homePlayer.framesLost || 0) + awayScore,
      winPercentage: calculateWinPercentage(homePlayer.framesWon + homeScore, homePlayer.framesLost + awayScore)
    },
    {
      ...awayPlayer,
      played: (awayPlayer.played || 0) + 1,
      won: awayScore > homeScore ? (awayPlayer.won || 0) + 1 : awayPlayer.won || 0,
      lost: awayScore < homeScore ? (awayPlayer.lost || 0) + 1 : awayPlayer.lost || 0,
      framesWon: (awayPlayer.framesWon || 0) + awayScore,
      framesLost: (awayPlayer.framesLost || 0) + homeScore,
      winPercentage: calculateWinPercentage(awayPlayer.framesWon + awayScore, awayPlayer.framesLost + homeScore)
    }
  ];

  // Update storage
  updateStoredData({
    matches: updatedMatches,
    teams: updatedTeams,
    players: updatedPlayers
  });
};

const calculateWinPercentage = (framesWon: number, framesLost: number): number => {
  const totalFrames = framesWon + framesLost;
  if (totalFrames === 0) return 0;
  return (framesWon / totalFrames) * 100;
};

export const getPlayerStats = (teamId: string): Player[] => {
  const { players } = getStoredData();
  return players
    .filter(player => player.teamId === teamId)
    .sort((a, b) => b.framesWon - a.framesWon);
};

export const getTeamLeaderboard = (teamId: string): Player[] => {
  const players = getPlayerStats(teamId);
  return players.sort((a, b) => {
    if (b.framesWon !== a.framesWon) {
      return b.framesWon - a.framesWon;
    }
    return b.winPercentage - a.winPercentage;
  });
};