import React, { useState } from 'react';
import Seat, { SeatProps } from './Seat';
import venueData from '../../public/venue.json';

interface SelectedSeat {
  id: string;
  sectionId: string;
  row: number;
  col: number;
  priceTier: number;
  status: string;
}

const SeatMap: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<SeatProps[]>([]);

  const handleSelect = (seat: SeatProps) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);

      if (exists) {
        // Deselect if already selected
        return prev.filter((s) => s.id !== seat.id);
      } else {
        // Max 8 seats
        if (prev.length >= 8) return prev;
        return [...prev, seat];
      }
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: venueData.map.width,
        height: venueData.map.height,
        border: '1px solid #ccc',
      }}
    >
      {venueData.sections.map((section) =>
        section.rows.map((row, rIndex) =>
          row.seats.map((seat) => {
            // Apply section transform
            const transformedX =
              (seat.x + (section.transform?.x || 0)) *
              (section.transform?.scale || 1);
            const transformedY =
              (seat.y + (section.transform?.y || 0)) *
              (section.transform?.scale || 1);

            return (
              <Seat
                key={seat.id}
                id={seat.id}
                row={row.index}
                col={seat.col}
                x={transformedX}
                y={transformedY}
                priceTier={seat.priceTier}
                status={
                  seat.status as 'available' | 'reserved' | 'sold' | 'held'
                }
                sectionId={section.id}
              />
            );
          })
        )
      )}
    </div>
  );
};

export default SeatMap;
