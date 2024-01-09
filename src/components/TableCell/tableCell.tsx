import { useEffect, useState } from 'react';
import { TableCellProps } from '../../api/types/tableCellTypes';

export const TableCell = ({
  getValue,
  row,
  column,
  table,
  cell,
}: TableCellProps) => {
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
      className='bg-transparent'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={onBlur}
    />
  );
};
