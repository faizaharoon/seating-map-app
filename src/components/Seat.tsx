import React from 'react';
import { Seat as SeatType } from '../types/venue';
import { useSeatContext } from '../context/SeatSelectionContext';
import clsx from 'clsx';

export interface SeatProps {
  id: string;
  sectionId: string;
  row: number;
  col: number;
  x: number;
  y: number;
  priceTier: number;
  status: 'available' | 'reserved' | 'sold' | 'held';
}

const Seat: React.FC<SeatProps> = ({
  id,
  sectionId,
  row,
  col,
  x,
  y,
  priceTier,
  status,
}) => {
  const { selected, dispatch } = useSeatContext();
  const isSelected = selected.includes(id);

  const handleClick = () => {
    if (status === 'available') {
      dispatch({ type: 'toggle', seatId: id });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && status === 'available') {
      dispatch({ type: 'toggle', seatId: id });
    }
  };

  const colorMap: Record<typeof status, string> = {
    available: 'green',
    reserved: 'orange',
    sold: 'red',
    held: 'blue',
  };

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        aria-label={`Seat ${id}, Section ${sectionId}, Row ${row}, Col ${col}, Price tier ${priceTier}, Status ${status}`}
        onClick={handleClick}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 25,
          height: 25,
          backgroundColor: isSelected ? 'yellow' : colorMap[status], // ✅ change color if selected
          border: '1px solid #000',
          borderRadius: 4,
          cursor: status === 'available' ? 'pointer' : 'not-allowed',
        }}
      />
    </>
  );
};

export default Seat;
