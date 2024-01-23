import useCalculatorStore from '../../utils/calculatorStore';
import { calculatedPlatoValues } from './unitResults';
import { ResultField } from '../../components/Results/ResultsField';
import { ResultText } from '../../components/Results/ResultsText';
import { ResultsWrapper } from '../../components/Results/ResultsWrapper';
import { ResultsContainer } from '../../components/Results/ResultsContainer';
import { DiscountButton } from '../../components/Buttons/DiscountButton/DiscountButton';
import { WarningText } from '../../components/WarningText/WarningText';
import { ResultsTitle } from '../../components/Results/ResultsTitle';

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
