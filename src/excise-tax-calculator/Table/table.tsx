import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Resizer } from '../../components/Resizer/resizer';
import { useState } from 'react';

interface TableProps {
  data: RowData[];
}

export interface RowData {
  [key: number]: string | undefined;
}

export interface Beer {
  orderNumber: number;
  beerName: string;
  plato: string;
  volume: string;
  packageType: string;
  quantities: number;
}

const columnHelper = createColumnHelper<RowData | Beer>();

const defaultColumns = [
  columnHelper.accessor('orderNumber', {
    id: 'orderNumber',
    size: 40,
    header: () => <span>No.</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>No.</span>,
  }),
  columnHelper.accessor('beerName', {
    size: 500,
    header: () => <span>Beer name</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>Beer name</span>,
  }),
  columnHelper.accessor('plato', {
    size: 150,
    header: () => <span>Extract [Plato°]</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>Extract [Plato°]</span>,
  }),
  columnHelper.accessor('volume', {
    size: 80,
    header: () => <span>Volume</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>Volume</span>,
  }),
  columnHelper.accessor('packageType', {
    size: 130,
    header: () => <span>Package type</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>Package type</span>,
  }),
  columnHelper.accessor('quantities', {
    size: 100,
    header: () => <span>Quantities</span>,
    cell: (info) => info.getValue(),
    footer: () => <span>Quantities</span>,
  }),
];

export const Table = ({ data }: TableProps) => {
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  });

  return (
    <div className='overflow-x-auto px-14 py-2'>
      <table
        {...{
          className: `border-collapse`,
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
