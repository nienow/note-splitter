import GridEditor from './grid/GridEditor';
import StickyEditor from './sticky/StickyEditor';
import TabEditor from './tab/TabEditor';
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
  'randombits.sticky': StickyEditor,
  'randombits.tab': TabEditor,
  'randombits.section': SectionEditor,
};
