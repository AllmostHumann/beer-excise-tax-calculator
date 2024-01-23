import { RowData } from '../../../api/types/csvReaderTypes';
import { Beer } from '../../../api/types/dataTypes';
import DeleteButton from './icons/deleteButton.svg?react';
import { Cell, Column, Getter, Row, Table } from '@tanstack/react-table';

export interface TableCellProps {
  getValue: Getter<string>;
  row: Row<RowData | Beer>;
  column: Column<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
  cell: Cell<RowData | Beer, unknown>;
}

export const DeleteRowButton: React.FC<TableCellProps> = ({ table, row }) => {
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
