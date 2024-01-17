import { useCSVReader } from 'react-papaparse';
import useCalculatorStore from '../../utils/calculatorStore';
import { ParsedResults, ParserProps } from '../../api/types/csvReaderTypes';

export const CSVReader = () => {
  const { CSVReader } = useCSVReader();
  const { setData, removeData, setAcceptedFileName, acceptedFileName } =
    useCalculatorStore();
  const platoRegex =
    /(\d\d,\d°|\d\d,\d\d°|\d,\d°|\d\d,\d⁰|\d\d,\d\d⁰|\d,\d⁰|\d\d,\dº|\d\d,\d\dº|\d,\dº)/g;
  const volumeRegex =
    /(0,5 l|0,5l|0,75 l|0,75l|0,44 l|0,44l|0,33 l|0,33l|0,375 l|0,375l|0,750 l|0,750l|30 l|30l|20 l|20l|10 l|10l)/g;
  const packageTypeRegex = /(but\.|but|can(?=\s)|keg|keykeg|KeyKeg)/g;

  return (
    <CSVReader
      onUploadAccepted={(results: ParsedResults, file: File) => {
        setAcceptedFileName(file.name);
        const parsedData = results.data
          .map((row) => {
            const orderNumber = row[0];
            const plato = row[2]?.match(platoRegex)?.[0] || '';
            const volume = row[2]?.match(volumeRegex)?.[0] || '';
            const packageType = row[2]?.match(packageTypeRegex)?.[0] || '';
            const beerName =
              row[2]
                ?.replace(platoRegex, '')
                ?.replace(volumeRegex, '')
                ?.replace(packageTypeRegex, '') || '';
            const quantities = row[3];

            return {
              orderNumber,
              beerName,
              plato,
              volume,
              packageType,
              quantities,
            };
          })
          .slice(10, -3);
        setData(parsedData);
      }}
      config={{
        header: false,
        dynamicTyping: false,
        skipEmptyLines: true,
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }: ParserProps) => (
        <>
          <div className='mb-[10px] flex flex-row justify-center'>
            <button
              type='button'
              {...getRootProps()}
              className='mx-0 my-[5px] h-[40px] cursor-pointer bg-[#366992] px-[10px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#4B91C9] md:h-[45px] md:px-[25px]'
            >
              <p className='translate-y-[-1px] md:translate-y-0'>Browse</p>
            </button>
            <div className='mx-0 my-[5px] h-[40px] w-[60%] bg-white px-[10px] py-[3px] font-medium leading-10 text-black outline-none md:h-[45px] md:px-[25px]'>
              <p className='translate-y-[-1px] md:translate-y-0'>
                {acceptedFile ? acceptedFile.name : acceptedFileName}
              </p>
            </div>
            <button
              {...getRemoveFileProps()}
              onClick={(event) => {
                removeData();
                getRemoveFileProps().onClick?.(event);
              }}
              className='mx-0 my-[5px] h-[40px] cursor-pointer bg-[#A01919] px-[10px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#DD2222] md:h-[45px] md:px-[25px]'
            >
              <p className='translate-y-[-1px] md:translate-y-0'>Remove</p>
            </button>
          </div>
        </>
      )}
    </CSVReader>
  );
};
