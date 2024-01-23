import useCalculatorStore from '../../../utils/calculatorStore';

export const DiscountButtonn = () => {
  const { acceptedFileName, discount, setDiscount } = useCalculatorStore();
  const useDiscountForSmallProducers = () => {
    setDiscount(discount === 1 ? 2 : 1);
  };

  return (
    <div className={`m-4 ${acceptedFileName ? 'block' : 'hidden'}`}>
      <label
        className='px-1 pt-1 text-[14px] font-medium text-white md:text-[16px] md:font-semibold'
        htmlFor='discount'
      >
        Discount for small producers (50%)
      </label>
      <input
        id='discount'
        onClick={useDiscountForSmallProducers}
        className='size-4 translate-y-0.5 hover:fill-red-400 md:hover:scale-[1.15]'
        type='checkbox'
        name='discountCheckBox'
        defaultChecked={discount === 2 ? true : false}
      />
    </div>
  );
};
