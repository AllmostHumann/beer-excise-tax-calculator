import { ParserProps } from '../../../api/types/csvReaderTypes';

export const BrowseFileButton = ({ getRootProps }: ParserProps) => {
  return (
    <button
      type='button'
      {...(getRootProps && getRootProps())}
      className='mx-0 my-[5px] h-[40px] cursor-pointer rounded-md bg-[#366992] px-[10px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#4B91C9] md:h-[45px] md:px-[25px]'
    >
      <p className='translate-y-[-1px] md:translate-y-0'>Browse</p>
    </button>
  );
};
