import { Resizer } from '../../components/Resizer/resizer';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import useCalculatorStore from '../../utils/calculatorStore';
import { RowData } from '../../api/types/csvReaderTypes';
import { Beer } from '../../api/types/dataTypes';
import { TableCell } from '../../components/TableCell/tableCell';

const columnHelper = createColumnHelper<RowData | Beer>();

const defaultColumns = [
  columnHelper.accessor('orderNumber', {
    id: 'orderNumber',
    size: 50,
    header: () => <span>No.</span>,
    cell: TableCell,
    footer: () => <span>No.</span>,
  }),
  columnHelper.accessor('beerName', {
    size: 500,
    header: () => <span>Beer name</span>,
    cell: TableCell,
    footer: () => <span>Beer name</span>,
  }),
  columnHelper.accessor('plato', {
    size: 150,
    header: () => <span>Extract [Plato°]</span>,
    cell: TableCell,
    footer: () => <span>Extract [Plato°]</span>,
  }),
  columnHelper.accessor('volume', {
    size: 80,
    header: () => <span>Volume</span>,
    cell: TableCell,
    footer: () => <span>Volume</span>,
  }),
  columnHelper.accessor('packageType', {
    size: 130,
    header: () => <span>Package type</span>,
    cell: TableCell,
    footer: () => <span>Package type</span>,
  }),
  columnHelper.accessor('quantities', {
    size: 100,
    header: () => <span>Quantities</span>,
    cell: TableCell,
    footer: () => <span>Quantities</span>,
  }),
];

export const Table = () => {
  const { data, setData, acceptedFileName } = useCalculatorStore();
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  });

  return (
    <div className='mx-5 my-2 overflow-x-auto'>
      <table
        {...{
          className: `border-collapse ${acceptedFileName ? 'table' : 'hidden'}`,
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead className='border-[1px] border-solid border-black'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  {...{
                    className:
                      'relative border-[1px] border-solid border-black',
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <Resizer
                    header={header}
                    table={table}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='border-[1px] border-solid border-black'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className='border-[1px] border-solid border-black'
                  key={cell.id}
                  style={{
                    width: `${cell.column.getSize()}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='border-[1px] border-solid border-black '>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  {...{
                    className:
                      'relative border-[1px] border-solid border-black',
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: `${header.getSize()}px`,
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
