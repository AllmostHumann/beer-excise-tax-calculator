import { HTMLAttributes } from 'react';

export interface RowData {
  [key: number]: string | undefined;
}

export interface ParsedResults {
  data: RowData[];
}

export interface ParserProps {
  getRootProps: () => HTMLAttributes<HTMLElement>;
  acceptedFile: File;
  getRemoveFileProps: () => HTMLAttributes<HTMLElement>;
}
