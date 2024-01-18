import WarningIcon from './icons/warning.svg?react';
import useCalculatorStore from '../../utils/calculatorStore';
import { calculatedPlatoValues } from './unitResults';

export const CalculatedResults = () => {
  const { data, acceptedFileName, discount, setDiscount } =
    useCalculatorStore();

  const useDiscountForSmallProducers = () => {
    setDiscount(discount === 1 ? 2 : 1);
  };

  const resultsForPlato = calculatedPlatoValues(data, discount);

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
          id='discount'
          onClick={useDiscountForSmallProducers}
          className='translate-y-0.5'
          type='checkbox'
          name='discountCheckBox'
          defaultChecked={discount === 2 ? true : false}
        />
      </div>

      <div className='grid grid-cols-[1fr_1fr] gap-1 md:mx-5 md:grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
        {resultsForPlato.map((result) => (
          <div
            key={result.plato}
            className='flex flex-col border-[2px] border-solid p-1'
          >
            <div className='flex flex-row font-normal md:font-medium'>
              Extract:
              <p className='pl-1 font-semibold md:font-bold'>
                {result.plato} Plato
              </p>
            </div>
            <div className='flex flex-row font-normal md:font-medium'>
              {window.innerWidth < 1024 ? 'U.' : 'Units'} volume:
              <p className='pl-1 font-semibold md:font-bold'>
                {result.unitPackagesSumQuantities} hl
              </p>
            </div>
            <div className='flex flex-row font-normal md:font-medium'>
              {window.innerWidth < 1024 ? 'U.' : 'Units'} tax:
              <p className='pl-1 font-semibold md:font-bold'>
                {result.unitTax} zł
              </p>
            </div>
            <div className='flex flex-row font-normal md:font-medium'>
              {window.innerWidth < 1024 ? 'B.' : 'Barrels'} volume:
              <p className='pl-1 font-semibold md:font-bold'>
                {result.barrelsSumQuantities} hl
              </p>
            </div>
            <div className='flex flex-row font-normal md:font-medium'>
              {window.innerWidth < 1024 ? 'B.' : 'Barrels'} tax:
              <p className='pl-1 font-semibold md:font-bold'>
                {result.barrelsTax} zł
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
