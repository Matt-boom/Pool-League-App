export type LeagueDivision = 'Prem' | 'Div1' | 'Div2' | 'Div3' | 'Div4';

export interface League {
  id: string;
  name: LeagueDivision;
  teams: string[]; // Team IDs
  matches: string[]; // Match IDs
  players: string[]; // Player IDs
  currentWeek: number;
  seasonStartDate?: string;
  seasonEndDate?: string;
}

export interface LeagueStats {
  totalTeams: number;
  totalPlayers: number;
  totalMatches: number;
  completedMatches: number;
  averageFramesPerMatch: number;
  topScorer?: {
    playerId: string;
    playerName: string;
    framesWon: number;
  };
}

export interface LeagueSettings {
  framesPerMatch: number;
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  promotionPlaces: number;
  relegationPlaces: number;
}

export interface LeagueSeason {
  id: string;
  leagueId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  settings: LeagueSettings;
}