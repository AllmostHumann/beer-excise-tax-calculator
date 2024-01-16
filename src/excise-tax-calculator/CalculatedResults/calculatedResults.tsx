import WarningIcon from './icons/warning.svg?react';
import { useState } from 'react';
import useCalculatorStore from '../../utils/calculatorStore';

export const CalculatedResults = () => {
  const { data, acceptedFileName } = useCalculatorStore();
  const [discount, setDiscount] = useState(1);

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

        console.log(item.volume);

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

      const taxToPay = ((sumQuantities * 10.4) / discount).toFixed(2);
      return {
        plato: platoValue,
        sumQuantities: sumQuantities.toFixed(2),
        taxToPay: taxToPay,
      };
    })
    .sort((a, b) => {
      const platoA = parseFloat((a.plato || '0').replace(',', '.'));
      const platoB = parseFloat((b.plato || '0').replace(',', '.'));
    
      return platoA - platoB;
    });;

  return (
    <div>
      <div className='flex flex-row items-center justify-center font-bold mb-4'>
        <WarningIcon className='h-6' />
        <p>
          Tax for beer in 2024 - 10.40 zł per hectolitre for each degree Plato
          of the finished product.
        </p>
      </div>
      <div className={`m-4 ${acceptedFileName ? 'block' : 'hidden'}`}>
          <label
            className='pr-1 pt-1'
            htmlFor='dicount'
          >
            Discount for small producers (50%)
          </label>
          <input
            onClick={useDiscountForSmallProducers}
            className='translate-y-0.5'
            type='checkbox'
            name='discount'
          />
        </div>
      <div >
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-1 px-5'>
          {resultsForPlato.map((result) => (
            <div
              key={result.plato}
              className='flex flex-col px-1  border-solid border-[2px]'
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
