import { Header, Table } from '@tanstack/react-table';
import { RowData } from '../../api/types/csvReaderTypes';
import { Beer } from '../../api/types/dataTypes';

interface ResizerProps {
  header: Header<RowData | Beer, unknown>;
  table: Table<RowData | Beer>;
}

export const Resizer: React.FC<ResizerProps> = ({ header, table }) => {
  return (
    <div
      {...{
        onDoubleClick: () => header.column.resetSize(),
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute right-0 top-0 h-[25px] w-[5px] select-none bg-black opacity-0 hover:cursor-col-resize hover:touch-none hover:opacity-100 ${
          table.options.columnResizeDirection
        } ${header.column.getIsResizing() ? 'opacity-100 bg-blue-700' : ''}`,
        style: {
          transform:
            table.options.columnResizeMode === 'onEnd' &&
            header.column.getIsResizing()
              ? `translateX(${
                  1 * (table.getState().columnSizingInfo.deltaOffset ?? 0)
                }px)`
              : '',
        },
      }}
    />
  );
};
