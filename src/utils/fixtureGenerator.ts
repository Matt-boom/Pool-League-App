import { Team } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FixtureRound {
  weekNumber: number;
  matches: {
    homeTeam: Team;
    awayTeam: Team;
  }[];
}

export const generateFixtures = (teams: Team[]): FixtureRound[] => {
  // Remove any bye teams
  const activeTeams = teams.filter(team => !team.name.startsWith('BYE'));
  const numberOfTeams = activeTeams.length;
  
  if (numberOfTeams % 2 !== 0) {
    throw new Error('Need an even number of teams to generate fixtures');
  }

  // Generate first half fixtures
  const firstHalfFixtures: FixtureRound[] = [];
  const teamsPerRound = numberOfTeams - 1;
  const roundsFirstHalf = numberOfTeams - 1;

  // Create array of teams to rotate
  const teamRotation = [...activeTeams];
  const firstTeam = teamRotation.shift()!;

  for (let round = 0; round < roundsFirstHalf; round++) {
    const roundMatches = [];
    const roundNumber = round + 1;

    // First team plays against rotating team
    roundMatches.push({
      homeTeam: round % 2 === 0 ? firstTeam : teamRotation[0],
      awayTeam: round % 2 === 0 ? teamRotation[0] : firstTeam
    });

    // Generate other matches
    for (let i = 1; i < teamsPerRound / 2; i++) {
      const homeIdx = i;
      const awayIdx = teamsPerRound - i;
      
      roundMatches.push({
        homeTeam: teamRotation[homeIdx],
        awayTeam: teamRotation[awayIdx]
      });
    }

    firstHalfFixtures.push({
      weekNumber: roundNumber,
      matches: roundMatches
    });

    // Rotate teams (except first team)
    teamRotation.push(teamRotation.shift()!);
  }

  // Generate second half by reversing home/away
  const secondHalfFixtures = firstHalfFixtures.map((round, index) => ({
    weekNumber: round.weekNumber + roundsFirstHalf,
    matches: round.matches.map(match => ({
      homeTeam: match.awayTeam,
      awayTeam: match.homeTeam
    }))
  }));

  return [...firstHalfFixtures, ...secondHalfFixtures];
};

export const convertRoundsToMatches = (rounds: FixtureRound[]) => {
  return rounds.flatMap(round => 
    round.matches.map(fixture => ({
      id: uuidv4(),
      week: round.weekNumber,
      date: null,
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      homeScore: 0,
      awayScore: 0,
      isCompleted: false
    }))
  );
};