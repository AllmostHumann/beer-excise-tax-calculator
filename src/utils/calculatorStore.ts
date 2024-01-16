import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { RowData } from '../api/types/csvReaderTypes';

interface CalculatorState {
  data: RowData[];
  acceptedFileName: string;
  discount: number;
}

interface CalculatorStore extends CalculatorState {
  setData: (data: RowData[] | ((old: RowData[]) => RowData[])) => void;
  setAcceptedFileName: (acceptedFileName: string) => void;
  setDiscount: (discount: number) => void;
  removeData: () => void;
}

const initialState: CalculatorState = {
  data: [],
  acceptedFileName: '',
  discount: 2,
};

const useCalculatorStore = create<CalculatorStore>()(
  persist(
    devtools((set) => ({
      ...initialState,
      data: [],
      acceptedFileName: '',
      discount: 2,
      setData: (data) =>
        set((state) => ({
          data: typeof data === 'function' ? data(state.data) : data,
        })),
      setAcceptedFileName: (acceptedFileName) => set({ acceptedFileName }),
      setDiscount: (discount) => set({ discount }),
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
