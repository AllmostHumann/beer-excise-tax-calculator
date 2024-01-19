import { useCSVReader } from 'react-papaparse';
import { BrowseFileButton } from '../../components/Buttons/ReaderButtons/browseFileButton';
import { BrowseRemoveButton } from '../../components/Buttons/ReaderButtons/removeButton';
import { FileField } from '../../components/FileField/filefield';
import { CSVReaderWrapper } from '../../components/CSVReaderWrapper/csvReaderWrapper';
import useCalculatorStore from '../../utils/calculatorStore';
import { ParsedResults, ParserProps } from '../../api/types/csvReaderTypes';

export const CSVReader = () => {
  const { CSVReader } = useCSVReader();
  const { setData, setAcceptedFileName } = useCalculatorStore();
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
      {({acceptedFile, getRemoveFileProps,getRootProps} :ParserProps ) => (
        <CSVReaderWrapper>
          <BrowseFileButton getRootProps={getRootProps}/>
          <FileField acceptedFile={acceptedFile}  />
          <BrowseRemoveButton getRemoveFileProps={getRemoveFileProps}/>
        </CSVReaderWrapper>
      )}
    </CSVReader>
  );
};
