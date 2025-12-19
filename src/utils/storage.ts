export const getStoredSelection = () => {
  try {
    return JSON.parse(localStorage.getItem('selectedSeats') ?? '[]') as string[];
  } catch {
    return [];
  }
};

export const setStoredSelection = (ids: string[]) => {
  localStorage.setItem('selectedSeats', JSON.stringify(ids));
};