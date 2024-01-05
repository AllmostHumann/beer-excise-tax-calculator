import { HTMLAttributes, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { Table } from '../Table/table';

interface ParsedResults {
  data: RowData[];
}

interface RowData {
  [key: number]: string | undefined;
}

interface ParserProps {
  getRootProps: () => HTMLAttributes<HTMLElement>;
  acceptedFile: File;
  getRemoveFileProps: () => HTMLAttributes<HTMLElement>;
}

export const CSVReader = () => {
  const { CSVReader } = useCSVReader();
  const [data, setData] = useState<RowData[]>([]);
  const platoRegex = /\d\d,\d° | \d\d,\d\d° | \d,\d°/;
  const volumeRegex =
    /\s(0,5 l|0,75 l|0,44 l|0,33 l|0,375 l| 0,750 l |30 l|20 l|10 l)/g;
  const packageTypeRegex = /but\.|but|can|keg|keykeg/;

  return (
    <CSVReader
      onUploadAccepted={(results: ParsedResults) => {
        const parsedData = results.data
          .map((row) => {
            const orderNumber = row[0];
            const plato = row[2]?.match(platoRegex)?.[0] || '';
            const volume = row[2]?.match(volumeRegex)?.[0] || '';
            const packageType = row[2]?.match(packageTypeRegex)?.[0] || '';
            const name =
              row[2]
                ?.replace(platoRegex, '')
                ?.replace(volumeRegex, '')
                ?.replace(packageTypeRegex, '') || '';
            const quantities = row[3];

            return {
              orderNumber: orderNumber,
              beerName: name,
              plato: plato,
              volume: volume,
              packageType: packageType,
              quantities: quantities,
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
          <div className='mb-[10px] flex flex-row items-center justify-center'>
            <button
              type='button'
              {...getRootProps()}
              className='mx-0 my-[5px] h-[65px] cursor-pointer bg-[#366992] px-[25px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#4B91C9] md:h-[44px]'
            >
              Browse file
            </button>
            <div className='mx-0 my-[5px] h-[65px] w-[60%] bg-white px-[25px] pt-[3px] font-medium leading-10 text-black outline-none md:h-[44px]'>
              {acceptedFile && acceptedFile.name}
            </div>
            <button
              {...getRemoveFileProps()}
              className='mx-0 my-[5px] h-[65px] cursor-pointer bg-[#A01919] px-[25px] py-[10px] font-medium leading-6 text-white outline-none hover:bg-[#DD2222] md:h-[44px]'
            >
              Remove
            </button>
          </div>
          <Table data={data} />
        </>
      )}
    </CSVReader>
  );
};
