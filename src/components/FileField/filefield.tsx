import { ParserProps } from '../../api/types/csvReaderTypes';
import useCalculatorStore from '../../utils/calculatorStore';

export const FileField = ({ acceptedFile }: ParserProps) => {
  const { acceptedFileName } = useCalculatorStore();

  return (
    <div className='mx-2 my-[5px] h-[40px] w-[60%] rounded-md bg-silver px-3 py-[3px] font-medium leading-10 text-black outline-none md:h-[45px] md:px-[25px]'>
      <p className='translate-y-[-1px] md:translate-y-0'>
        {acceptedFile ? acceptedFile.name : acceptedFileName}
      </p>
    </div>
  );
};
