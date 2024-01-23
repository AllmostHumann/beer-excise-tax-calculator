import WarningIcon from './icons/warning.svg?react';

export const WarningTextt = () => {
  return (
    <div className='mb-4 flex flex-row items-center justify-center font-bold'>
      <WarningIcon className='md:w6 w-12 pr-2' />
      <p className='text-[14px] font-medium text-white md:text-[16px] md:font-semibold'>
        Tax for beer in 2024 - 10.40 zł per hectolitre for each degree Plato of
        the finished product.
      </p>
    </div>
  );
};
