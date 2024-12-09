import { v4 as uuidv4 } from 'uuid';
import { Team, Match, Player } from '../types';
import { League, LeagueDivision } from '../types/league';
import { generateFixtures, convertRoundsToMatches } from '../utils/fixtureGenerator';

export const testTeams = [
  // Premier Division
  { league: 'Prem', name: 'BREAK ROOM A' },
  { league: 'Prem', name: 'CROWN A (STAPENHILL)' },
  { league: 'Prem', name: 'DOVESIDE PROPHETS' },
  { league: 'Prem', name: 'HAWK AND BUCKLE' },
  { league: 'Prem', name: 'MONKSBRIDGE' },
  { league: 'Prem', name: 'POTTERS' },
  { league: 'Prem', name: 'POTTERS BUS DRIVERS' },
  { league: 'Prem', name: 'ROYAL OAK (HORNINGLOW)' },
  { league: 'Prem', name: 'ROYAL OAK A (NEWHALL)' },
  { league: 'Prem', name: 'SPOT ON CLUB' },
  { league: 'Prem', name: 'THE BEECH' },
  { league: 'Prem', name: 'THE GROVE' },
  { league: 'Prem', name: 'TUTBURY CLUB A' },
  { league: 'Prem', name: 'TUTBURY PHOENIX' },

  // Division 1
  { league: 'Div1', name: 'BELMONT CLUB' },
  { league: 'Div1', name: 'BREAK ROOM BALDIES' },
  { league: 'Div1', name: 'DOVESIDE DIABLOS' },
  { league: 'Div1', name: 'HANBURY COBRAS' },
  { league: 'Div1', name: 'NAVIGATION' },
  { league: 'Div1', name: 'POTTERS JEWELS' },
  { league: 'Div1', name: 'ROYAL OAK B (NEWHALL)' },
  { league: 'Div1', name: 'SHOBNALL SHARPSHOOTERS' },
  { league: 'Div1', name: 'SPOT ON AMATEURS' },
  { league: 'Div1', name: 'STRETTON BALDIES' },
  { league: 'Div1', name: 'TUTBURY MINXES' },
  { league: 'Div1', name: 'VICTORIA INN A' },

  // Division 2
  { league: 'Div2', name: 'ANGLESEY ARMS (WINSHILL)' },
  { league: 'Div2', name: 'BEECH BALDIES' },
  { league: 'Div2', name: 'BREAK ROOM B' },
  { league: 'Div2', name: 'BREAK ROOM D' },
  { league: 'Div2', name: 'BREAK ROOM ROYALS' },
  { league: 'Div2', name: 'JUBILEE WARRIORS' },
  { league: 'Div2', name: 'MARSTONS CLUB' },
  { league: 'Div2', name: 'MOUNT NON-DRIVERS' },
  { league: 'Div2', name: 'MOUNT PLEASANT' },
  { league: 'Div2', name: 'NEW INN TINKLES' },
  { league: 'Div2', name: 'POTTERS SNAKELETS' },
  { league: 'Div2', name: 'SPOT ON STARS' },
  { league: 'Div2', name: 'TUTBURY TIGERS' },
  { league: 'Div2', name: 'VICTORIA INN B' },

  // Division 3
  { league: 'Div3', name: 'ALBION' },
  { league: 'Div3', name: 'BREAK ROOM BELTERS' },
  { league: 'Div3', name: 'CROWN PHOENIX' },
  { league: 'Div3', name: 'GATECRASHERS (STANTON)' },
  { league: 'Div3', name: 'GREAT NORTHERN NOBENTS' },
  { league: 'Div3', name: 'KINGS HEAD (HILTON)' },
  { league: 'Div3', name: 'NEW INN (STAPENHILL)' },
  { league: 'Div3', name: 'SPOT ON A' },
  { league: 'Div3', name: 'SPRINGFIELD A (SWADLINCOTE)' },
  { league: 'Div3', name: 'SPRINGFIELD B (SWADLINCOTE)' },
  { league: 'Div3', name: 'STRETTON STROKERS' },
  { league: 'Div3', name: 'TEAM WHYST' },
  { league: 'Div3', name: 'TUTBURY THUNDER' },
  { league: 'Div3', name: 'VINE VIPERS (TUTBURY)' },

  // Division 4
  { league: 'Div4', name: 'BREAK ROOM BREAKING BAD' },
  { league: 'Div4', name: 'BREAK ROOM F' },
  { league: 'Div4', name: 'BREAK ROOM HOT SHOTS' },
  { league: 'Div4', name: 'GRANGE INN' },
  { league: 'Div4', name: 'JUBILEE (WINSHILL)' },
  { league: 'Div4', name: 'LEOPARD INN (BURTON)' },
  { league: 'Div4', name: 'MUSHROOM HALL (SWADLINCOTE)' },
  { league: 'Div4', name: 'POTTERS CLUB C' },
  { league: 'Div4', name: 'SOUTH STAPENHILL S.C A' },
  { league: 'Div4', name: 'SOUTH STAPENHILL S.C B' },
  { league: 'Div4', name: 'SPOT ON MY BALLS' },
  { league: 'Div4', name: 'TALBOT BOSS (HILTON)' },
  { league: 'Div4', name: 'TUTBURY TAP' },
  { league: 'Div4', name: 'TUTBURY TITANS' }
];

const createLeague = (division: LeagueDivision): League => ({
  id: uuidv4(),
  name: division,
  teams: [],
  matches: [],
  players: [],
  currentWeek: 1,
  seasonStartDate: new Date().toISOString(),
  seasonEndDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString()
});

const createTeam = (name: string, league: string): Team => ({
  id: uuidv4(),
  name,
  league,
  played: 0,
  won: 0,
  lost: 0,
  framesFor: 0,
  framesAgainst: 0,
  points: 0
});

export const generateTestData = () => {
  const leagues: League[] = [];
  const teams: Team[] = [];
  const matches: Match[] = [];
  const players: Player[] = [];

  // Group teams by division
  const teamsByDivision = testTeams.reduce((acc, { league, name }) => {
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(name);
    return acc;
  }, {} as Record<string, string[]>);

  // Create leagues and teams
  Object.entries(teamsByDivision).forEach(([divisionName, teamNames]) => {
    const league = createLeague(divisionName as LeagueDivision);
    leagues.push(league);

    // Create teams for this division
    const divisionTeams = teamNames.map(name => {
      const team = createTeam(name, league.id);
      league.teams.push(team.id);
      return team;
    });
    teams.push(...divisionTeams);

    // Generate fixtures for this division
    const fixtureRounds = generateFixtures(divisionTeams);
    const divisionMatches = convertRoundsToMatches(fixtureRounds);
    matches.push(...divisionMatches);
    league.matches.push(...divisionMatches.map(m => m.id));
  });

  return { leagues, teams, matches, players };
};