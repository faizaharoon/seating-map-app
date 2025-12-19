import React from 'react';
import { SeatSelectionProvider } from './context/SeatSelectionContext';
import SeatMap from './components/SeatMap';
import { SelectionSummary } from './components/SelectionSummary';
import SeatLegend from './components/SeatLegent';

const App: React.FC = () => {
  return (
    <SeatSelectionProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        <h1>Log Horizon Arena</h1>
        <SeatLegend/>
        <SelectionSummary />
        <SeatMap />
      </div>
    </SeatSelectionProvider>
  );
};

export default App;