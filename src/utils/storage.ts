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

export const getStoredArena = () => {
  try {
    return JSON.parse(localStorage.getItem('arena') ?? '') as any;
  } catch {
    return null;
  }
};

export const setStoredArena = (arena: any) => {
  localStorage.setItem('arena', JSON.stringify(arena));
};