import { v4 as uuidv4 } from 'uuid';
import { Team, Match, Player } from '../types';
import { League, LeagueDivision } from '../types/league';
import { generateFixtures, convertRoundsToMatches } from '../utils/fixtureGenerator';

export const createTeam = (name: string, leagueName: LeagueDivision): Team => ({
  id: uuidv4(),
  name,
  league: leagueName,
  played: 0,
  won: 0,
  lost: 0,
  framesFor: 0,
  framesAgainst: 0,
  points: 0
});

export const createLeague = (name: LeagueDivision): League => ({
  id: uuidv4(),
  name,
  teams: [],
  matches: [],
  players: [],
  currentWeek: 1
});

export const buildLeagues = (leagueData: Record<string, string[]>): {
  leagues: League[];
  teams: Team[];
  matches: Match[];
} => {
  const leagues: League[] = [];
  const teams: Team[] = [];
  const matches: Match[] = [];

  // Create leagues
  Object.entries(leagueData).forEach(([leagueName, teamNames]) => {
    const league = createLeague(leagueName as LeagueDivision);
    
    // Create teams for this league
    const leagueTeams = teamNames.map(name => createTeam(name, league.name));
    teams.push(...leagueTeams);
    league.teams = leagueTeams.map(team => team.id);

    // Generate fixtures for this league
    const fixtureRounds = generateFixtures(leagueTeams);
    const leagueMatches = convertRoundsToMatches(fixtureRounds);
    matches.push(...leagueMatches);
    league.matches = leagueMatches.map(match => match.id);

    leagues.push(league);
  });

  return {
    leagues,
    teams: teams.sort((a, b) => a.name.localeCompare(b.name)),
    matches
  };
};

export const getLeagueStats = (league: League, teams: Team[], matches: Match[], players: Player[]): LeagueStats => {
  const leagueMatches = matches.filter(match => league.matches.includes(match.id));
  
  return {
    totalTeams: league.teams.length,
    totalPlayers: league.players.length,
    totalMatches: leagueMatches.length,
    completedMatches: leagueMatches.filter(match => match.isCompleted).length
  };
};