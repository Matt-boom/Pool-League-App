export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getCurrentWeek = (matches: { week: number }[]): number => {
  const today = new Date();
  const maxWeek = Math.max(...matches.map(m => m.week));
  
  // Find the current week based on completed matches
  const currentWeek = matches.reduce((week, match) => {
    if (match.week > week && new Date(match.date || '') <= today) {
      return match.week;
    }
    return week;
  }, 1);

  return Math.min(currentWeek, maxWeek);
};

export const getWeekDateRange = (weekNumber: number, startDate: Date): { start: Date; end: Date } => {
  const start = new Date(startDate);
  start.setDate(start.getDate() + (weekNumber - 1) * 7);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  
  return { start, end };
};