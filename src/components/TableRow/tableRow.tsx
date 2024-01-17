import AddButton from './icons/addButton.svg?react';
import DeleteButton from './icons/deleteButton.svg?react';
import { TableCellProps } from '../../api/types/tableCellTypes';

export const TableRow = ({ table, row }: TableCellProps) => {
  const meta = table?.options.meta;

  const addRow = () => {
    meta?.addRow(row.index);
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className='flex flex-row justify-center'>
      <button
        onClick={addRow}
        className='px-1 py-1'
      >
        <AddButton className='h-auto w-6' />
      </button>
      <button
        onClick={removeRow}
        className='px-1'
      >
        <DeleteButton className='h-auto w-6' />
      </button>
    </div>
  );
};
