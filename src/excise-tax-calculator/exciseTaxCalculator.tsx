import { Container } from '../components/Container/container';
import { CSVReader } from './CSVReader/csvReader';
import { CalculatedResults } from './CalculatedResults/calculatedResults';
import { Table } from './Table/table';

export const ExciseTaxCalculator = () => {
  return (
    <Container>
      <CSVReader />
      <CalculatedResults />
      <Table />
    </Container>
  );
};
