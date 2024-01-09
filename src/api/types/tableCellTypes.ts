import { Cell, Column, Getter, Row, Table } from '@tanstack/react-table';
import { RowData } from './csvReaderTypes';
import { Beer } from './dataTypes';

export interface TableCellProps {
  getValue: Getter<string>;
  row: Row<RowData | Beer>;
  column: Column<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
  cell: Cell<RowData | Beer, unknown>;
}
