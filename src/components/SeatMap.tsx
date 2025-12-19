import React, { useState } from 'react';
import Seat, { SeatProps } from './Seat';
// import venueData from '../../public/venue.json';

interface SeatMapProps {
  venueData: {
    map: {
      width: number;
      height: number;
    };
    sections: Array<{
      id: string;
      transform?: {
        x?: number;
        y?: number;
        scale?: number;
      };
      rows: Array<{
        index: number;
        seats: Array<{
          id: string;
          x: number;
          y: number;
          col: number;
          priceTier: number;
          status: 'available' | 'reserved' | 'sold' | 'held';
        }>;
      }>;
    }>;
  };
}

const SeatMap: React.FC<SeatMapProps> = ({venueData}) => {

  return (
    <div
      style={{
        position: 'relative',
        width: venueData.map.width,
        height: venueData.map.height,
        border: '1px solid #ccc',
        overflow: 'auto' 
      }}
    >
      {venueData.sections.map((section) =>
        section.rows.map((row) =>
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
