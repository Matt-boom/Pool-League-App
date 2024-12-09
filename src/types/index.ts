export interface Team {
  id: string;
  name: string;
  played: number;
  won: number;
  lost: number;
  framesFor: number;
  framesAgainst: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  played: number;
  won: number;
  lost: number;
  framesWon: number;
  framesLost: number;
  winPercentage: number;
}

export interface Match {
  id: string;
  week: number;
  date: string | null;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  isCompleted: boolean;
  homePlayer?: Player;
  awayPlayer?: Player;
}

export interface Frame {
  id: string;
  matchId: string;
  frameNumber: number;
  homePlayerScore: number;
  awayPlayerScore: number;
  winner: 'home' | 'away' | null;
  homePlayerName: string;
  awayPlayerName: string;
}

export interface ApiResponse<T> {
  success: string;
  data: T;
  error?: string;
}