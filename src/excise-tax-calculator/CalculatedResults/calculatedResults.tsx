import useCalculatorStore from '../../utils/calculatorStore';

export const CalculatedResults = () => {
  const { data } = useCalculatorStore();

  const filteredData = data.filter((item) => item.plato === '12,0°');
  const sumQuantities =
    filteredData.reduce(
      (sum, item) => sum + (parseInt(item.quantities!, 10) || 0),
      0,
    ) / 200;

  console.log(filteredData);

  return (
    <div>
      <div>Extract [Plato°]: {}</div>
      <div>Volume [Hl]: {sumQuantities}</div>
    </div>
  );
};
