import useCalculatorStore from '../../utils/calculatorStore';
import { calculatedPlatoValues } from './unitResults';
import { ResultField } from '../../components/Results/ResultsField';
import { ResultText } from '../../components/Results/ResultsText';
import { ResultsWrapper } from '../../components/Results/ResultsWrapper';
import { ResultsContainer } from '../../components/Results/ResultsContainer';
import { DiscountButtonn } from '../../components/Buttons/DiscountButton/DiscountButton';
import { WarningTextt } from '../../components/WarningText/WarningText';
import { ResultsTitle } from '../../components/Results/ResultsTitle';

export const CalculatedResultss = () => {
  const { data, discount } = useCalculatorStore();

  const resultsForPlato = calculatedPlatoValues(data, discount);

  return (
    <div>
      <WarningTextt />
      <DiscountButtonn />
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
