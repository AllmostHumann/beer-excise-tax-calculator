import { Container } from '../components/Container/Container';
import { CSVReaderr } from './CSVReader/CsvReader';
import { CalculatedResultss } from './CalculatedResults/CalculatedResults';
import { Tablee } from './Table/Table';

export const ExciseTaxCalculatorr = () => {
  return (
    <Container>
      <CSVReaderr />
      <CalculatedResultss />
      <Tablee />
    </Container>
  );
};
