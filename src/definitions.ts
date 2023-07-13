import GridEditor from './grid/GridEditor';
import SectionEditor from './section/SectionEditor';

export interface ISection {
  title?: string;
  text?: string;
}

export interface IData {
  editor: string;
  version: number;
  columns?: number;
  title?: boolean;
  sections: ISection[];
}

export const EDITORS: { [key: string]: () => JSX.Element } = {
  'randombits.grid': GridEditor,
  'randombits.section': SectionEditor,
};
