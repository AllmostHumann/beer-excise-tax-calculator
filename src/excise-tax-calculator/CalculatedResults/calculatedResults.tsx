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
            return sum + quantities / 200;
          case '0,33 l':
            return sum + quantities * 0.0033;
          case '0,44 l':
            return sum + quantities * 0.0044;
          case '0,375 l':
            return sum + quantities * 0.00375;
          case '0,75 l':
            return sum + quantities * 0.0075;
          case '10 l':
            return sum + quantities * 0.1;
          case '20 l':
            return sum + quantities * 0.2;
          case '30 l':
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
        <WarningIcon className='h-6' />
        <p>
          Tax for beer in 2024 - 10.40 zł per hectolitre for each degree Plato
          of the finished product.
        </p>
      </div>
      <div className={`m-4 ${acceptedFileName ? 'block' : 'hidden'}`}>
        <label
          className='px-1 pt-1 font-bold'
          htmlFor='dicount'
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
      <div>
        <div className='mx-5 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-1'>
          {resultsForPlato.map((result) => (
            <div
              key={result.plato}
              className='flex flex-col border-[2px]  border-solid px-1'
            >
              <div className='px-1'>
                Extract: <p className='font-bold'>{result.plato} Plato</p>
              </div>
              <div className='px-1'>
                Volume: <p className='font-bold'>{result.sumQuantities} hl</p>
              </div>
              <div className='px-1'>
                Tax: <p className='font-bold'>{result.taxToPay} zł</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
