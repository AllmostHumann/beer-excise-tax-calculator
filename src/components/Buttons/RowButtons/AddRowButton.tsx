import { RowData } from '../../../api/types/csvReaderTypes';
import { Beer } from '../../../api/types/dataTypes';
import AddButton from './icons/addButton.svg?react';
import { Cell, Column, Getter, Row, Table } from '@tanstack/react-table';

export interface TableCellProps {
  getValue: Getter<string>;
  row: Row<RowData | Beer>;
  column: Column<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
  cell: Cell<RowData | Beer, unknown>;
}

export const AddRowButton: React.FC<TableCellProps> = ({ table, row }) => {
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
