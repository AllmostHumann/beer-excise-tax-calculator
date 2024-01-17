import WarningIcon from './icons/warning.svg?react';
import useCalculatorStore from '../../utils/calculatorStore';

export const CalculatedResults = () => {
  const { data, acceptedFileName, discount, setDiscount } =
    useCalculatorStore();

  const useDiscountForSmallProducers = () => {
    if (discount === 1) {
      setDiscount(2);
    } else if (discount === 2) setDiscount(1);
  };

  const uniquePlatoValues = [...new Set(data.map((item) => item.plato))].filter(
    (platoValue) => platoValue !== '' && platoValue?.includes('°'),
  );

  const resultsForPlato = uniquePlatoValues
    .map((platoValue) => {
      const filteredData = data.filter((item) => item.plato === platoValue);
      const sumQuantities = filteredData.reduce((sum, item) => {
        const quantities = item.quantities ? parseInt(item.quantities, 10) : 0;

        switch (item.volume) {
          case '0,5 l':
          case '0,5l':
            return sum + quantities / 200;
          case '0,33 l':
          case '0,33l':
            return sum + quantities * 0.0033;
          case '0,44 l':
          case '0,44l':
            return sum + quantities * 0.0044;
          case '0,375 l':
          case '0,375l':
            return sum + quantities * 0.00375;
          case '0,75 l':
          case '0,75l':
            return sum + quantities * 0.0075;
          case '10 l':
          case '10l':
            return sum + quantities * 0.1;
          case '20 l':
          case '20l':
            return sum + quantities * 0.2;
          case '30 l':
          case '30l':
            return sum + quantities * 0.3;
          default:
            return sum + quantities;
        }
      }, 0);

      const taxToPay = (sumQuantities * 10.4) / discount;
      return {
        plato: platoValue,
        sumQuantities: sumQuantities.toFixed(2),
        taxToPay: taxToPay.toFixed(2),
      };
    })
    .sort((a, b) => {
      const platoA = parseFloat((a.plato || '0').replace(',', '.'));
      const platoB = parseFloat((b.plato || '0').replace(',', '.'));

      return platoA - platoB;
    });

  return (
    <div>
      <div className='mb-4 flex flex-row items-center justify-center font-bold'>
        <WarningIcon className='md:w6 w-12 pr-2' />
        <p>
          Tax for beer in 2024 - 10.40 zł per hectolitre for each degree Plato
          of the finished product.
        </p>
      </div>
      <div className={`m-4 ${acceptedFileName ? 'block' : 'hidden'}`}>
        <label
          className='px-1 pt-1 font-bold'
          htmlFor='discount'
        >
          Discount for small producers (50%)
        </label>
        <input
          onClick={useDiscountForSmallProducers}
          className='translate-y-0.5'
          type='checkbox'
          name='discount'
          defaultChecked={discount === 2 ? true : false}
        />
      </div>

      <div className='grid grid-cols-[1fr_1fr] gap-1 md:mx-5 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]'>
        {resultsForPlato.map((result) => (
          <div
            key={result.plato}
            className='flex flex-col border-[2px]  border-solid px-1'
          >
            <div className='px-1 font-medium'>
              Extract: <p className='font-bold'>{result.plato} Plato</p>
            </div>
            <div className='px-1 font-medium'>
              Volume: <p className='font-bold'>{result.sumQuantities} hl</p>
            </div>
            <div className='px-1 font-medium'>
              Tax: <p className='font-bold'>{result.taxToPay} zł</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
