import DeleteButton from './icons/deleteButton.svg?react';
import { TableCellProps } from '../../../api/types/tableCellTypes';

export const DeleteRowButton = ({ table, row }: TableCellProps) => {
  const meta = table?.options.meta;

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className='flex flex-row justify-center bg-silverChalice'>
      <button
        onClick={removeRow}
        className='px-1'
      >
        <DeleteButton className='h-auto w-6 fill-sunsetOrange hover:scale-[1.03] hover:fill-red-600 md:hover:scale-[1.15]' />
      </button>
    </div>
  );
};
