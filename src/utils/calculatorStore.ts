import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { RowData } from '../api/types/csvReaderTypes';

interface CalculatorState {
  data: RowData[];
  acceptedFileName: string;
}

interface CalculatorStore extends CalculatorState {
  setData: (data: RowData[] | ((old: RowData[]) => RowData[])) => void;
  setAcceptedFileName: (acceptedFileName: string) => void;
  removeData: () => void;
}

const initialState: CalculatorState = {
  data: [],
  acceptedFileName: '',
};

const useCalculatorStore = create<CalculatorStore>()(
  persist(
    devtools((set) => ({
      ...initialState,
      data: [],
      acceptedFileName: '',
      setData: (data) =>
        set((state) => ({
          data: typeof data === 'function' ? data(state.data) : data,
        })),
      setAcceptedFileName: (acceptedFileName) => set({ acceptedFileName }),
      removeData: () => {
        set(initialState);
      },
    })),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCalculatorStore;
