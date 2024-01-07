import { Container } from './components/Container/container';
import { Header } from './components/Header/header';
import { ExciseTaxCalculator } from './excise-tax-calculator/exciseTaxCalculator';

function App() {
  return (
    <Container>
      <Header title='Beer excise tax calculator' />
      <ExciseTaxCalculator />
    </Container>
  );
}

export default App;
