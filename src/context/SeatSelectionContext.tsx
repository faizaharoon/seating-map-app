import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStoredSelection, setStoredSelection } from '../utils/storage';
import { MAX_SEATS_ALLOWED } from '../globals';

type State = { selected: string[] };
type Action =
  | { type: 'toggle'; seatId: string }
  | { type: 'reset'; seatId: string  };

const SeatContext = createContext<{
  selected: string[];
  dispatch: React.Dispatch<Action>;
}>({ selected: [], dispatch: () => {} });

function reducer(state: State, action: Action): State {
  if (action.type === 'toggle') {
    const exists = state.selected.includes(action.seatId);
    if (!exists && state.selected.length >= MAX_SEATS_ALLOWED) return state;
    const selected = exists
      ? state.selected.filter((id) => id !== action.seatId)
      : [...state.selected, action.seatId];
    return { selected };
  }
  if (action.type === 'reset') {
    return { selected: [] };
  }
  return state;
}

export const SeatSelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    { selected: [] },
    () => ({ selected: getStoredSelection() }) // initializer function
  );

  useEffect(() => {
    setStoredSelection(state.selected);
  }, [state.selected]);

  return (
    <SeatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SeatContext.Provider>
  );
};

export const useSeatContext = () => useContext(SeatContext);
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
