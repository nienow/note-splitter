export interface ISectionData {
  editor: string;
  version: number;
  title?: boolean;
  sections: ISectionSection[];
}

export interface ISectionSection {
  title?: string;
  text?: string;
}
