import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayerStats } from '../components/players/PlayerStats';
import { createTestPlayer } from '../utils/testUtils';

describe('PlayerStats', () => {
  const players = [
    {
      ...createTestPlayer('John Doe', 'team1'),
      played: 5,
      won: 3,
      lost: 2,
      framesWon: 35,
      framesLost: 15,
      winPercentage: 70
    },
    {
      ...createTestPlayer('Jane Smith', 'team2'),
      played: 4,
      won: 2,
      lost: 2,
      framesWon: 25,
      framesLost: 15,
      winPercentage: 62.5
    }
  ];

  it('renders player statistics table', () => {
    render(<PlayerStats players={players} />);
    
    expect(screen.getByText('Player Statistics')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('sorts players by win percentage', () => {
    render(<PlayerStats players={players} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[2]).toHaveTextContent('Jane Smith');
  });

  it('displays correct statistics for each player', () => {
    render(<PlayerStats players={players} />);
    
    const johnStats = screen.getByText('John Doe').closest('tr');
    const janeStats = screen.getByText('Jane Smith').closest('tr');
    
    expect(johnStats).toHaveTextContent('5'); // Played
    expect(johnStats).toHaveTextContent('3'); // Won
    expect(johnStats).toHaveTextContent('35'); // Frames Won
    
    expect(janeStats).toHaveTextContent('4'); // Played
    expect(janeStats).toHaveTextContent('2'); // Won
    expect(janeStats).toHaveTextContent('25'); // Frames Won
  });
});