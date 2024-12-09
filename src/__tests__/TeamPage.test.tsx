import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { TeamPage } from '../pages/TeamPage';
import { createTestTeam, createTestPlayer, createTestMatch } from '../utils/testUtils';
import * as storageUtils from '../utils/storage';

vi.mock('../utils/storage');

describe('TeamPage', () => {
  const team = createTestTeam('Test Team');
  const player = createTestPlayer('Test Player', team.id);
  const match = createTestMatch(team, createTestTeam('Away Team'));

  beforeEach(() => {
    vi.mocked(storageUtils.getStoredData).mockReturnValue({
      teams: [team],
      players: [player],
      matches: [match]
    });
  });

  it('renders team details', () => {
    render(
      <MemoryRouter initialEntries={[`/team/${team.id}`]}>
        <Routes>
          <Route path="/team/:teamId" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(team.name)).toBeInTheDocument();
    expect(screen.getByText('Team Players')).toBeInTheDocument();
    expect(screen.getByText('Recent Matches')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    vi.mocked(storageUtils.getStoredData).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ teams: [], players: [], matches: [] }), 100);
      });
    });

    render(
      <MemoryRouter initialEntries={[`/team/${team.id}`]}>
        <Routes>
          <Route path="/team/:teamId" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles team not found error', () => {
    vi.mocked(storageUtils.getStoredData).mockReturnValue({
      teams: [],
      players: [],
      matches: []
    });

    render(
      <MemoryRouter initialEntries={['/team/invalid-id']}>
        <Routes>
          <Route path="/team/:teamId" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error Loading Team')).toBeInTheDocument();
    expect(screen.getByText('Team not found')).toBeInTheDocument();
  });
});