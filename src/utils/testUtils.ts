import { Match, Team, Player, Frame } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createTestTeam = (name: string): Team => ({
  id: uuidv4(),
  name,
  played: 0,
  won: 0,
  lost: 0,
  framesFor: 0,
  framesAgainst: 0,
  points: 0
});

export const createTestPlayer = (name: string, teamId: string): Player => ({
  id: uuidv4(),
  name,
  teamId,
  played: 0,
  won: 0,
  lost: 0,
  framesWon: 0,
  framesLost: 0,
  winPercentage: 0
});

export const createTestMatch = (homeTeam: Team, awayTeam: Team, week: number = 1): Match => ({
  id: uuidv4(),
  week,
  date: new Date().toISOString(),
  homeTeam,
  awayTeam,
  homeScore: 0,
  awayScore: 0,
  isCompleted: false
});

export const createTestFrames = (matchId: string): Frame[] => 
  Array.from({ length: 10 }, (_, i) => ({
    id: `${matchId}-${i + 1}`,
    matchId,
    frameNumber: i + 1,
    homePlayerScore: 0,
    awayPlayerScore: 0,
    winner: null
  }));