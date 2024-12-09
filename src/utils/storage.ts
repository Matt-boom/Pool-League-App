import { Team, Player, Match } from '../types';
import { League } from '../types/league';

interface StoredData {
  leagues: League[];
  teams: Team[];
  players: Player[];
  matches: Match[];
}

const defaultData: StoredData = {
  leagues: [],
  teams: [],
  players: [],
  matches: []
};

export const getStoredData = (): StoredData => {
  try {
    const leagues = JSON.parse(localStorage.getItem('leagues') || '[]');
    const teams = JSON.parse(localStorage.getItem('teams') || '[]');
    const players = JSON.parse(localStorage.getItem('players') || '[]');
    const matches = JSON.parse(localStorage.getItem('matches') || '[]');
    
    return { leagues, teams, players, matches };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultData;
  }
};

export const updateStoredData = (data: Partial<StoredData>): void => {
  try {
    if (data.leagues) {
      localStorage.setItem('leagues', JSON.stringify(data.leagues));
    }
    if (data.teams) {
      localStorage.setItem('teams', JSON.stringify(data.teams));
    }
    if (data.players) {
      localStorage.setItem('players', JSON.stringify(data.players));
    }
    if (data.matches) {
      localStorage.setItem('matches', JSON.stringify(data.matches));
    }
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const getLeagueData = (leagueId: string): {
  league: League | null;
  teams: Team[];
  players: Player[];
  matches: Match[];
} => {
  try {
    const { leagues, teams, players, matches } = getStoredData();
    const league = leagues.find(l => l.id === leagueId) || null;

    if (!league) {
      return { league: null, teams: [], players: [], matches: [] };
    }

    const leagueTeams = teams.filter(team => league.teams.includes(team.id));
    const leaguePlayers = players.filter(player => league.players.includes(player.id));
    const leagueMatches = matches.filter(match => league.matches.includes(match.id));

    return {
      league,
      teams: leagueTeams,
      players: leaguePlayers,
      matches: leagueMatches
    };
  } catch (error) {
    console.error('Error getting league data:', error);
    return { league: null, teams: [], players: [], matches: [] };
  }
};

export const updateLeagueData = (
  leagueId: string,
  updates: {
    teams?: Team[];
    players?: Player[];
    matches?: Match[];
  }
): void => {
  try {
    const storedData = getStoredData();
    const league = storedData.leagues.find(l => l.id === leagueId);

    if (!league) {
      throw new Error('League not found');
    }

    const updatedData: Partial<StoredData> = {};

    if (updates.teams) {
      updatedData.teams = storedData.teams.map(team => 
        updates.teams?.find(t => t.id === team.id) || team
      );
    }

    if (updates.players) {
      updatedData.players = storedData.players.map(player =>
        updates.players?.find(p => p.id === player.id) || player
      );
    }

    if (updates.matches) {
      updatedData.matches = storedData.matches.map(match =>
        updates.matches?.find(m => m.id === match.id) || match
      );
    }

    updateStoredData(updatedData);
  } catch (error) {
    console.error('Error updating league data:', error);
  }
};