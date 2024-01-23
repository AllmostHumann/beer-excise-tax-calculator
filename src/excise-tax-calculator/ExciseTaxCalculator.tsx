import { Container } from '../components/Container/Container';
import { CSVReader } from './CSVReader/CsvReader';
import { CalculatedResults } from './CalculatedResults/CalculatedResults';
import { Table } from './Table/Table';

export const ExciseTaxCalculator = () => {
  return (
    <Container>
      <CSVReader />
      <CalculatedResults />
      <Table />
    </Container>
  );
};
