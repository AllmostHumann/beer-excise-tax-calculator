import { HTMLAttributes, useState } from 'react';
import { useCSVReader } from 'react-papaparse';

interface ParseResults {
  data: RowData[];
}

interface RowData {
  [key: number]: string | undefined;
}

interface ParserProps2 {
  getRootProps: () => HTMLAttributes<HTMLElement>;
  acceptedFile: File;
  getRemoveFileProps: () => HTMLAttributes<HTMLElement>;
}

export const CSVReader = () => {
  const { CSVReader } = useCSVReader();
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const platoRegex = /\d\d,\d° | \d\d,\d\d° | \d,\d°/;
  const volumeRegex = /\s(0,5 l|0,75 l|0,44 l|0,33 l|0,375 l|30 l|20 l|10 l)/g;
  const packageTypeRegex = /but\.|but|can|keg|keykeg/;

  return (
    <CSVReader
      onUploadAccepted={(results: ParseResults) => {
        const parsedData = results.data
          .map((row) => {
            const plato = row[2]?.match(platoRegex)?.[0] || '';
            const volume = row[2]?.match(volumeRegex)?.[0] || '';
            const packageType = row[2]?.match(packageTypeRegex)?.[0] || '';
            const name =
              row[2]
                ?.replace(platoRegex, '')
                ?.replace(volumeRegex, '')
                ?.replace(packageTypeRegex, '') || '';

            return {
              0: row[0],
              1: name,
              2: plato,
              3: volume,
              4: packageType,
              5: row[3],
            };
          })
          .slice(10, -3);
        setRowData(parsedData);
        setHeaders([
          'Lp.',
          'Nazwa',
          'Plato',
          'Objętość',
          'Opakowanie',
          'Ilości',
        ]);
      }}
      config={{
        header: false,
        dynamicTyping: false,
        skipEmptyLines: true,
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }: ParserProps2) => (
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
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index}>
                  {headers.map((header, index) => (
                    <td key={header}>{row[index]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </CSVReader>
  );
};
