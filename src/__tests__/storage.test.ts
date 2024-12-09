import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredData, updateStoredData } from '../utils/storage';
import { createTestTeam, createTestPlayer, createTestMatch } from '../utils/testUtils';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty arrays when storage is empty', () => {
    const data = getStoredData();
    expect(data.teams).toEqual([]);
    expect(data.players).toEqual([]);
    expect(data.matches).toEqual([]);
  });

  it('stores and retrieves data correctly', () => {
    const team = createTestTeam('Test Team');
    const player = createTestTeam('Test Player');
    const match = createTestMatch(team, team);

    updateStoredData({
      teams: [team],
      players: [player],
      matches: [match]
    });

    const data = getStoredData();
    expect(data.teams).toHaveLength(1);
    expect(data.players).toHaveLength(1);
    expect(data.matches).toHaveLength(1);
  });

  it('partially updates stored data', () => {
    const team = createTestTeam('Test Team');
    updateStoredData({ teams: [team] });

    const data = getStoredData();
    expect(data.teams).toHaveLength(1);
    expect(data.players).toEqual([]);
    expect(data.matches).toEqual([]);
  });
});