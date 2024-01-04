import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface TableProps {
  data: RowData[];
}

interface RowData {
  [key: number]: string | undefined;
}

interface Beer {
  orderNumber: number;
  beerName: string;
  plato: string;
  volume: string;
  packageType: string;
  quantities: number;
}

export const Table = ({ data }: TableProps) => {
  const columnHelper = createColumnHelper<RowData | Beer>();
  const columns = [
    columnHelper.accessor('orderNumber', {
      id: 'orderNumber',
      size: 100,
      header: () => <span>No.</span>,
      cell: (info) => info.getValue(),
      footer: () => <span>No.</span>,
    }),
    columnHelper.accessor('beerName', {
      size: 1000,
      header: () => <span>Beer name</span>,
      cell: (info) => info.getValue(),
      footer: () => <span>Beer name</span>,
    }),
    columnHelper.accessor('plato', {
      size: 400,
      header: () => <span>Extract [Plato°]</span>,
      cell: (info) => info.getValue(),
      footer: () => <span>Extract [Plato°]</span>,
    }),
    columnHelper.accessor('volume', {
      size: 200,
      header: () => <span>Volume</span>,
      cell: (info) => info.getValue(),
      footer: () => <span>Volume</span>,
    }),
    columnHelper.accessor('packageType', {
      size: 300,
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='p-2'>
      <table className='border-collapse'>
        <thead className='border-[1px] border-solid border-black'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className='border-[1px] border-solid border-black'
                  onMouseDown={header.getResizeHandler()}
                  key={header.id}
                  style={{
                    width: `${header.getSize()}px`,
                    transform: header.column.getIsResizing()
                      ? `translateX(${
                          table.getState().columnSizingInfo.deltaOffset
                        }px)`
                      : '',
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
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
                  key={cell.id}
                  className='border-[1px] border-solid border-black'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='border-[1px] border-solid border-black'>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='border-[1px] border-solid border-black'
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
