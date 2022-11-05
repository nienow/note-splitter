export interface IGridData {
  editor: string;
  version: number;
  rows: number;
  columns: number;
  title?: boolean;
  sections: IGridSectionData[][];
}

export interface IGridSectionData {
  title?: string;
  text?: string;
}
