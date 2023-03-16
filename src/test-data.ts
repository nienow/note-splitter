import {DataVersion, EDITOR_GRID} from './constants';
import {IData} from './definitions';

const data: IData = {
  editor: EDITOR_GRID,
  version: DataVersion,
  columns: 2,
  title: true,
  sections: [
    {title: 'Section 1', text: 'Text 1'},
    {title: 'Section 2', text: 'Text 2'},
    {title: 'Section 3', text: 'Text 3'},
    {title: 'Section 4', text: 'Text 4'}
  ]
};

export const TEST_DATA = JSON.stringify(data);
