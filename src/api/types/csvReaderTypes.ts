import { HTMLAttributes } from 'react';

export interface RowData {
  [key: number]: string | undefined;
  orderNumber?: string | undefined;
  beerName?: string;
  plato?: string;
  volume?: string;
  packageType?: string;
  quantities?: string | undefined;
  addRow?: string;
}

export interface ParsedResults {
  data: RowData[];
}

export interface ParserProps {
  getRootProps: () => HTMLAttributes<HTMLElement>;
  acceptedFile: File;
  getRemoveFileProps: () => HTMLAttributes<HTMLElement>;
}
