import React, { useState } from 'react';
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
  const [focusedSeat, setFocusedSeat] = useState<SeatProps | null>(null);

  const isSelected = selected.includes(id);

  const showSeatDetails = (seat: SeatProps) => setFocusedSeat(seat);
  const hideSeatDetails = () => setFocusedSeat(null);

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
        onKeyDown={handleKeyDown}
        onFocus={() =>
          showSeatDetails({ id, sectionId, row, col, x, y, priceTier, status })
        }
        onBlur={() => hideSeatDetails()}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 25,
          height: 25,
          zIndex: 10,
          backgroundColor: isSelected ? 'yellow' : colorMap[status], // ✅ change color if selected
          border: '1px solid #000',
          borderRadius: 4,
          cursor: status === 'available' ? 'pointer' : 'not-allowed',
        }}
      ></div>
      {focusedSeat && (
        <div
          style={{
            position: 'absolute',
            left: x - 2,
            top: y + 30,
            padding: 10,
            zIndex: 20,
            backgroundColor: 'white', // ✅ change color if selected
            border: '1px solid #000',
            borderRadius: 4,
          }}
        >
          {/* Tail element */}
          <div
            style={{
              position: 'absolute',
              top: -5,
              left: 10,
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid black',
              zIndex: 21,
            }}
          />
          {/* Tooltip content */}
          <div>
            <p style={{ margin: 0 }}>Section: {focusedSeat.sectionId}</p>
            <p style={{ margin: 0 }}>Row: {focusedSeat.row}</p>
            <p style={{ margin: 0 }}>Seat: {focusedSeat.id}</p>
            <p style={{ margin: 0 }}>Price: ${focusedSeat.priceTier * 50}</p>
            <p style={{ margin: 0 }}>Status: {focusedSeat.status}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Seat;
