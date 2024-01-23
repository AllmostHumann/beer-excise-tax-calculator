import { Resizer } from '../../components/Resizer/Resizer';
import { DebounceInput } from 'react-debounce-input';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import useCalculatorStore from '../../utils/calculatorStore';
import { RowData } from '../../api/types/csvReaderTypes';
import { Beer } from '../../api/types/dataTypes';
import { TableCell } from '../../components/TableCell/TableCell';
import { AddRowButton } from '../../components/Buttons/RowButtons/AddRowButton';
import { DeleteRowButton } from '../../components/Buttons/RowButtons/DeleteRowButton';

const columnHelper = createColumnHelper<RowData | Beer>();

const defaultColumns = [
  columnHelper.accessor('addRow', {
    id: 'addRow',
    size: 20,
    header: '',
    cell: AddRowButton,
    footer: '',
    enableResizing: false,
  }),
  columnHelper.accessor('orderNumber', {
    size: 40,
    header: () => <span className='pl-1'>No.</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>No.</span>,
  }),
  columnHelper.accessor('beerName', {
    size: 435,
    header: () => <span className='pl-1'>Beer name</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>Beer name</span>,
  }),
  columnHelper.accessor('plato', {
    size: 150,
    header: () => <span className='pl-1'>Extract [Plato°]</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>Extract [Plato°]</span>,
  }),
  columnHelper.accessor('volume', {
    size: 80,
    header: () => <span className='pl-1'>Volume</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>Volume</span>,
  }),
  columnHelper.accessor('packageType', {
    size: 130,
    header: () => <span className='pl-1'>Package type</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>Package type</span>,
  }),
  columnHelper.accessor('quantities', {
    size: 100,
    header: () => <span className='pl-1'>Quantities</span>,
    cell: TableCell,
    footer: () => <span className='pl-1'>Quantities</span>,
  }),
  columnHelper.accessor('deleteRow', {
    id: 'deleteRow',
    size: 20,
    header: '',
    cell: DeleteRowButton,
    footer: '',
    enableResizing: false,
  }),
];

export const Table = () => {
  const {
    data,
    setData,
    acceptedFileName,
    filtering,
    setFiltering,
    hideTable,
    setHideTable,
  } = useCalculatorStore();
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const toggleHideTable = () => {
    if (hideTable === false) {
      setHideTable(true);
    } else if (hideTable === true) {
      setHideTable(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setHideTable(true);
    } else if (window.innerWidth > 1024) {
      setHideTable(false);
    }
  }, [setHideTable]);

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
      addRow: (rowIndex: number) => {
        const newRow: RowData = {
          orderNumber: `${table.getRowModel().rows.length + 1}`,
          beerName: '',
          plato: '',
          volume: '',
          packageType: '',
          quantities: '',
        };
        setData((old) => {
          const row = [...old];
          row.splice(rowIndex + 1, 0, newRow);
          return row.map((row, index) => ({
            ...row,
            orderNumber: `${index + 1}`,
          }));
        });
      },
      removeRow: (rowIndex: number) => {
        setData((old) => {
          const udpateRow = old.filter(
            (_row: RowData, index: number) => index !== rowIndex,
          );
          return udpateRow.map((row, index) => ({
            ...row,
            orderNumber: `${index + 1}`,
          }));
        });
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  });

  return (
    <div className='mx-1 my-1 overflow-x-auto md:mx-5 md:my-2'>
      <button
        className={`my-2 rounded-md border-[1px] border-solid border-black bg-sherpaBlue px-1 font-medium text-white ${
          acceptedFileName ? 'block' : 'hidden'
        }`}
        type='button'
        onClick={() => toggleHideTable()}
      >
        {hideTable === false ? 'Hide table' : 'Show table'}
      </button>
      <div
        className={`flex flex-row items-center ${
          acceptedFileName ? 'block' : 'hidden'
        } ${hideTable === false ? 'block' : 'hidden'}`}
      >
        <p className='pl-[1px] pr-1 font-semibold text-alto'>Search:</p>
        <DebounceInput
          name='searchInput'
          className='my-2 rounded-md border-[1px] border-solid border-black bg-silverChalice px-1'
          debounceTimeout={300}
          type='text'
          value={filtering}
          onChange={(event) => setFiltering(event.target.value)}
        />
      </div>
      <table
        {...{
          className: `border-collapse font-medium ${
            acceptedFileName ? 'table' : 'hidden'
          } ${hideTable === false ? 'table' : 'hidden'}`,
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  {...{
                    className: `relative text-white font-medium ${
                      header.id === 'addRow' || header.id === 'deleteRow'
                        ? 'border-none bg-transparent'
                        : 'border-[1px] border-solid border-black bg-sherpaBlue'
                    }`,
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
                  {header.id === 'addRow' ||
                  header.id === 'deleteRow' ? null : (
                    <Resizer
                      header={header}
                      table={table}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className='border-[1px] border-solid border-black bg-silverChalice py-1'
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
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  {...{
                    className: `relative text-white font-medium ${
                      header.id === 'addRow' || header.id === 'deleteRow'
                        ? 'border-none bg-transparent'
                        : 'border-[1px] border-solid border-black bg-sherpaBlue'
                    }`,
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
