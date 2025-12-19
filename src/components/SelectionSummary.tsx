import React from 'react';
import { useSeatContext } from '../context/SeatSelectionContext';
import { MAX_SEATS_ALLOWED } from '../globals';

export const SelectionSummary: React.FC = () => {
  const { selected } = useSeatContext();
  return (
    <div>
      <p>Selected Seats: {selected.length} / {MAX_SEATS_ALLOWED}</p>
      <p>Selected Seats Codes: {selected.join(', ') || 'N/A'}</p>
      <p>Subtotal: ${selected.length * 50}</p>
    </div>
  );
};
