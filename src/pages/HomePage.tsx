import React, { useState, useEffect } from 'react';
import { LeagueSelector } from '../components/league/LeagueSelector';
import { LeagueOverview } from '../components/league/LeagueOverview';
import { AdminPanel } from '../components/admin/AdminPanel';
import { getStoredData } from '../utils/storage';
import { League } from '../types/league';

export const HomePage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const { leagues } = getStoredData();
    setLeagues(leagues);
    if (leagues.length > 0 && !selectedLeague) {
      setSelectedLeague(leagues[0]);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">League Management</h1>
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {showAdmin ? 'Hide Admin' : 'Show Admin'}
        </button>
      </div>

      {showAdmin && (
        <section>
          <AdminPanel />
        </section>
      )}

      {leagues.length > 0 && (
        <>
          <LeagueSelector
            leagues={leagues}
            selectedLeague={selectedLeague}
            onLeagueSelect={setSelectedLeague}
          />
          {selectedLeague && <LeagueOverview league={selectedLeague} />}
        </>
      )}
    </div>
  );
};