import React, { useEffect, useState } from 'react';
import { SeatSelectionProvider, useSeatContext } from './context/SeatSelectionContext';
import SeatMap from './components/SeatMap';
import { SelectionSummary } from './components/SelectionSummary';
import SeatLegend from './components/SeatLegent';
import { useVenue } from './hook/useVenue';
import { getStoredArena, setStoredArena } from './utils/storage';

const arenas = [
  { name: 'Metropolis Arena', seats: 50, file: '/venue.json' },
  { name: 'Armedia Arena', seats: 15000, file: '/venue_15000.json' },
];

const App: React.FC = () => {
  const { selected, dispatch } = useSeatContext();
  const [selectedArena, setSelectedArena] = useState(arenas[0]);
  const { venue, loading, error, fetchVenue } = useVenue();

  
  useEffect(() => {
    const restoreSelected = getStoredArena();
    if (restoreSelected) {
      setSelectedArena(restoreSelected);
      fetchVenue(restoreSelected.file);
    } else {
      fetchVenue(selectedArena.file);
    }
  }, []);

  const handleArenaChange = (arena: any) => {
    setSelectedArena(arena);
    setStoredArena(arena);
    fetchVenue(arena.file);
  };

  return (
    <SeatSelectionProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <select
          value={selectedArena.name}
          onChange={(e) => {
            const arena = arenas.find((a) => a.name === e.target.value);
            if (arena) handleArenaChange(arena);
          }}
        >
          {arenas.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name} ({a.seats} seats)
            </option>
          ))}
        </select>

        {loading && <p>Loading venue...</p>}

        {venue && (
          <>
            <SeatLegend />
            <SelectionSummary />
            <SeatMap venueData={venue} />
          </>
        )}
      </div>
    </SeatSelectionProvider>
  );
};

export default App;
