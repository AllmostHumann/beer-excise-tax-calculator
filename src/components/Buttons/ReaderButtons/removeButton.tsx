import { ParserProps } from '../../../api/types/csvReaderTypes';
import useCalculatorStore from '../../../utils/calculatorStore';

export const BrowseRemoveButton = ({ getRemoveFileProps }: ParserProps) => {
  const { removeData } = useCalculatorStore();

  return (
    <button
      {...(getRemoveFileProps && getRemoveFileProps())}
      onClick={(event) => {
        removeData();
        getRemoveFileProps && getRemoveFileProps().onClick?.(event);
      }}
      className='mx-0 my-[5px] h-[40px] cursor-pointer rounded-md bg-[#A01919] px-[10px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#DD2222] md:h-[45px] md:px-[25px]'
    >
      <p className='translate-y-[-1px] md:translate-y-0'>Remove</p>
    </button>
  );
};
