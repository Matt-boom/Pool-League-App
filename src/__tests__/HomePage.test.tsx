import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { createTestTeam, createTestPlayer, createTestMatch } from '../utils/testUtils';
import * as storageUtils from '../utils/storage';

vi.mock('../utils/storage');

describe('HomePage', () => {
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

  it('renders main sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('League Management')).toBeInTheDocument();
    expect(screen.getByText('Upload Teams')).toBeInTheDocument();
    expect(screen.getByText('League Table')).toBeInTheDocument();
  });

  it('displays player statistics when players exist', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Player Statistics')).toBeInTheDocument();
    expect(screen.getByText(player.name)).toBeInTheDocument();
  });

  it('handles match score updates', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Fixtures')).toBeInTheDocument();
    expect(vi.mocked(storageUtils.updateStoredData)).toHaveBeenCalled();
  });
});