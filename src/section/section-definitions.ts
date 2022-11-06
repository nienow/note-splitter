export interface ISectionData {
  editor: string;
  version: number;
  title?: boolean;
  columns: number;
  sections: ISectionSection[];
}

export interface ISectionSection {
  title?: string;
  text?: string;
}
