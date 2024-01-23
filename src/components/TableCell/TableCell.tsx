import { Cell, Column, Getter, Row, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { RowData } from '../../api/types/csvReaderTypes';
import { Beer } from '../../api/types/dataTypes';

interface TableCellProps {
  getValue: Getter<string>;
  row: Row<RowData | Beer>;
  column: Column<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
  cell: Cell<RowData | Beer, unknown>;
}

export const TableCell: React.FC<TableCellProps> = ({
  getValue,
  row,
  column,
  table,
  cell,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState('');

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, setValue]);

  return (
    <input
      id={cell.id}
      style={{ width: `${column.getSize()}px` }}
      className='bg-transparent pl-1'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={onBlur}
    />
  );
};
