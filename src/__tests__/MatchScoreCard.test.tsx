import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MatchScoreCard } from '../components/matches/MatchScoreCard';
import { createTestTeam, createTestMatch } from '../utils/testUtils';

describe('MatchScoreCard', () => {
  const homeTeam = createTestTeam('Home Team');
  const awayTeam = createTestTeam('Away Team');
  const match = createTestMatch(homeTeam, awayTeam);
  const onScoreUpdate = vi.fn();

  beforeEach(() => {
    onScoreUpdate.mockClear();
  });

  it('renders match score card with player inputs', () => {
    render(<MatchScoreCard match={match} onScoreUpdate={onScoreUpdate} />);
    
    expect(screen.getByText('Match Score Card')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Home Player Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Away Player Name')).toBeInTheDocument();
  });

  it('validates player names before submission', async () => {
    const user = userEvent.setup();
    render(<MatchScoreCard match={match} onScoreUpdate={onScoreUpdate} />);
    
    await user.click(screen.getByText('Submit Scores'));

    expect(window.alert).toHaveBeenCalledWith('Please enter both player names');
    expect(onScoreUpdate).not.toHaveBeenCalled();
  });

  it('calculates frame winners correctly', async () => {
    const user = userEvent.setup();
    render(<MatchScoreCard match={match} onScoreUpdate={onScoreUpdate} />);

    await user.type(screen.getByPlaceholderText('Home Player Name'), 'John');
    await user.type(screen.getByPlaceholderText('Away Player Name'), 'Jane');

    const frameInputs = screen.getAllByRole('spinbutton');
    await user.type(frameInputs[0], '50');
    await user.type(frameInputs[1], '30');

    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
  });

  it('submits match results correctly', async () => {
    const user = userEvent.setup();
    render(<MatchScoreCard match={match} onScoreUpdate={onScoreUpdate} />);

    await user.type(screen.getByPlaceholderText('Home Player Name'), 'John');
    await user.type(screen.getByPlaceholderText('Away Player Name'), 'Jane');

    const frameInputs = screen.getAllByRole('spinbutton');
    for (let i = 0; i < 10; i++) {
      await user.type(frameInputs[i * 2], '50');
      await user.type(frameInputs[i * 2 + 1], '30');
    }

    await user.click(screen.getByText('Submit Scores'));

    expect(onScoreUpdate).toHaveBeenCalled();
    const [matchId, frames, homePlayer, awayPlayer] = onScoreUpdate.mock.calls[0];
    
    expect(matchId).toBe(match.id);
    expect(frames).toHaveLength(10);
    expect(homePlayer.name).toBe('John');
    expect(awayPlayer.name).toBe('Jane');
    expect(homePlayer.framesWon).toBe(10);
    expect(awayPlayer.framesWon).toBe(0);
  });
});