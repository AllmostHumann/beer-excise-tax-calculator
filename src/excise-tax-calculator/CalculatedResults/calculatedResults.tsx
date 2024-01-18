import useCalculatorStore from '../../utils/calculatorStore';
import { calculatedPlatoValues } from './unitResults';
import { ResultField } from '../../components/Results/resultsField';
import { ResultText } from '../../components/Results/resultsText';
import { ResultsWrapper } from '../../components/Results/resultsWrapper';
import { ResultsContainer } from '../../components/Results/resultsContainer';
import { DiscountButton } from '../../components/Buttons/DiscountButton/discountButton';
import { WarningText } from '../../components/WarningText/warningText';
import { ResultsTitle } from '../../components/Results/resultsTitle';

export const CalculatedResults = () => {
  const { data, discount } = useCalculatorStore();

  const resultsForPlato = calculatedPlatoValues(data, discount);

  return (
    <div>
      <WarningText />
      <DiscountButton />
      <ResultsContainer>
        {resultsForPlato.map((result) => (
          <ResultsWrapper key={result.plato}>
            <ResultsTitle result={result.plato} />
            <ResultField>
              {window.innerWidth < 1024 ? 'U.' : 'Units'} volume:
              <ResultText>{result.unitPackagesSumQuantities} hl</ResultText>
            </ResultField>
            <ResultField>
              {window.innerWidth < 1024 ? 'U.' : 'Units'} tax:
              <ResultText>{result.unitTax} zł</ResultText>
            </ResultField>
            <ResultField>
              {window.innerWidth < 1024 ? 'B.' : 'Barrels'} volume:
              <ResultText>{result.barrelsSumQuantities} hl</ResultText>
            </ResultField>
            <ResultField>
              {window.innerWidth < 1024 ? 'B.' : 'Barrels'} tax:
              <ResultText> {result.barrelsTax} zł</ResultText>
            </ResultField>
          </ResultsWrapper>
        ))}
      </ResultsContainer>
    </div>
  );
};
