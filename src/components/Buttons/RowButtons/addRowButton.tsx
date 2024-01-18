import AddButton from './icons/addButton.svg?react';
import { TableCellProps } from '../../../api/types/tableCellTypes';

export const AddRowButton = ({ table, row }: TableCellProps) => {
  const meta = table?.options.meta;

  const addRow = () => {
    meta?.addRow(row.index);
  };

  return (
    <div className='flex flex-row justify-center bg-silverChalice'>
      <button
        onClick={addRow}
        className='px-1'
      >
        <AddButton className='h-auto w-6 translate-y-[1px] fill-limeade hover:scale-[1.03] hover:fill-japaneseLaurel md:hover:scale-[1.15]' />
      </button>
    </div>
  );
};
