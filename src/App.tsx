import { CSVReader } from './excise-tax-calculator/CSVReader/csvReader';
import { Container } from './components/Container/container';
import { Header } from './components/Header/header';

function App() {
  return (
    <Container>
      <Header title='Beer excise tax calculator' />
      <CSVReader />
    </Container>
  );
}

export default App;
