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
          <div className='flex flex-row mb-[10px] items-center'>
            <button
              type='button'
              {...getRootProps()}
              className='mx-0 my-[5px] py-[10px] px-[25px] bg-[#366992] hover:bg-[#4B91C9] text-white font-medium cursor-pointer outline-none leading-6'
            >
              Browse file
            </button>
            <div className='mx-0 my-[5px] px-[25px] pt-[3px] w-[60%] h-[44px] leading-10 outline-none bg-white text-black font-medium'>
              {acceptedFile && acceptedFile.name}
            </div>
            <button
              {...getRemoveFileProps()}
              className='mx-0 my-[5px] py-[10px] px-[25px] bg-[#A01919] hover:bg-[#DD2222] text-white font-medium cursor-pointer outline-none leading-6'
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
