import { useEffect, useState } from 'react';
import { Venue } from '../types/venue';

export function useVenue() {
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    fetch('/venue.json')
      .then(res => res.json())
      .then(setVenue);
  }, []);

  return venue;
}