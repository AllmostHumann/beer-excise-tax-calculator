export interface RowData {
  addRow?: string;
  [key: number]: string | undefined;
  orderNumber?: string | undefined;
  beerName?: string;
  plato?: string;
  volume?: string;
  packageType?: string;
  quantities?: string | undefined;
  deleteRow?: string;
}

export interface ParsedResults {
  data: RowData[];
}
