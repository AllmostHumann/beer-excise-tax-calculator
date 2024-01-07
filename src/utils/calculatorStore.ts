import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { RowData } from '../components/api/types/csvReaderTypes';

interface CalculatorState {
  data: RowData[];
  acceptedFileName: string;
}

interface CalculatorStore extends CalculatorState {
  setData: (data: RowData[]) => void;
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
      setData: (data) => set({ data }),
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
