import { Container } from './components/Container/Container';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ExciseTaxCalculatorr } from './excise-tax-calculator/ExciseTaxCalculator';

function App() {
  return (
    <>
      <Header title='Beer excise tax calculator' />
      <Container>
        <ExciseTaxCalculatorr />
      </Container>
      <Footer />
    </>
  );
}

export default App;
