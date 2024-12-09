import { useState, useCallback } from 'react';
import { Match } from '../types';
import { getCurrentWeek } from '../utils/dateUtils';

interface UseFixturesReturn {
  currentWeek: number;
  totalWeeks: number;
  setCurrentWeek: (week: number) => void;
  weekMatches: Match[];
  navigateWeek: (direction: 'prev' | 'next') => void;
}

export const useFixtures = (matches: Match[]): UseFixturesReturn => {
  const totalWeeks = Math.max(...matches.map(m => m.week));
  const [currentWeek, setCurrentWeek] = useState(() => getCurrentWeek(matches));

  const weekMatches = matches.filter(match => match.week === currentWeek);

  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    setCurrentWeek(current => {
      if (direction === 'prev' && current > 1) {
        return current - 1;
      }
      if (direction === 'next' && current < totalWeeks) {
        return current + 1;
      }
      return current;
    });
  }, [totalWeeks]);

  return {
    currentWeek,
    totalWeeks,
    setCurrentWeek,
    weekMatches,
    navigateWeek
  };
};