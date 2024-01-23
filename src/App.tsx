import { Container } from './components/Container/Container';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ExciseTaxCalculator } from './excise-tax-calculator/ExciseTaxCalculator';

function App() {
  return (
    <>
      <Header title='Beer excise tax calculator' />
      <Container>
        <ExciseTaxCalculator />
      </Container>
      <Footer />
    </>
  );
}

export default App;
