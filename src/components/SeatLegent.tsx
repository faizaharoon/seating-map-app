import React from 'react';

const statusColorMap: Record<string, string> = {
  available: '#4caf50', // green
  reserved: '#ff9800',  // orange
  sold: '#f44336',      // red
  held: '#2196f3',      // blue
};

const SeatLegend: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
      {Object.entries(statusColorMap).map(([status, color]) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: color,
              border: '1px solid #000',
              borderRadius: 4,
            }}
          />
          <span style={{ textTransform: 'capitalize' }}>{status}</span>
        </div>
      ))}

      {/* Optional: add selected color */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'yellow',
            border: '1px solid #000',
            borderRadius: 4,
          }}
        />
        <span>Selected</span>
      </div>
    </div>
  );
};

export default SeatLegend;
