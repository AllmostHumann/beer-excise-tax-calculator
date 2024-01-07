import { Container } from '../components/Container/container';
import { CSVReader } from './CSVReader/csvReader';
import { Table } from './Table/table';

export const ExciseTaxCalculator = () => {
  return (
    <Container>
      <CSVReader />
      <Table />
    </Container>
  );
};
