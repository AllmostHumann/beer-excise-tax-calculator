import { Container } from './components/Container/container';
import { Footer } from './components/Footer/footer';
import { Header } from './components/Header/header';
import { ExciseTaxCalculator } from './excise-tax-calculator/exciseTaxCalculator';

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
