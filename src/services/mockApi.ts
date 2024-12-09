import { ApiResponse } from '../types';
import { leagueTeams } from '../data/leagueData';
import { buildLeagues } from './leagueBuilder';
import { updateStoredData } from '../utils/storage';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const groupTeamsByLeague = () => {
  const leagues: Record<string, string[]> = {};
  
  leagueTeams.forEach(({ league, name }) => {
    if (!leagues[league]) {
      leagues[league] = [];
    }
    leagues[league].push(name);
  });
  
  return leagues;
};

export const initializeMockData = () => {
  const leagues = groupTeamsByLeague();
  const teams = buildLeagues(leagues);
  updateStoredData({ teams, players: [], matches: [] });
  return teams;
};

export const mockUploadTeams = async (_file: File): Promise<ApiResponse<{ leagues: Record<string, string[]> }>> => {
  await delay(1000); // Simulate network delay
  
  const leagues = groupTeamsByLeague();
  const teams = buildLeagues(leagues);
  updateStoredData({ teams });
  
  return {
    success: 'Leagues created',
    data: {
      leagues
    }
  };
};