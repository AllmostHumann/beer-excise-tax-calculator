import { Header, Table } from '@tanstack/react-table';
import { RowData } from './csvReaderTypes';
import { Beer } from './dataTypes';

export interface ResizerProps {
  header: Header<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
}
