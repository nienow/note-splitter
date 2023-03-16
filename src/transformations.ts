import {DataVersion, NienowGrid} from './constants';
import {IData} from './definitions';

export const transformEditorData = (text?: string): IData => {
  if (text.indexOf('{') === 0) {
    try {
      const parsedData = JSON.parse(text);
      if (parsedData.editor && parsedData.editor.startsWith('randombits.')) {
        return parsedData;
      }
    } catch (e) {
      console.error(e);
    }
  }
};

export const newData = (): IData => {
  return {
    editor: NienowGrid,
    version: DataVersion,
    columns: 2,
    title: true,
    sections: [{title: 'One'}, {title: 'Two'}, {title: 'Three'}, {title: 'Four'}]
  };
};

export const makeSectionsFillRows = (data: IData) => {
  let lonelySections = data.sections.length % data.columns;
  if (lonelySections) {
    lonelySections = data.sections.length % data.columns;
    if (lonelySections) {
      const fillCount = data.columns - lonelySections;
      for (let i = 0; i < fillCount; i++) {
        const newTab = {};
        data.sections.push(newTab);
      }
    }
  }
  clearEmptyRows(data);

};

export const clearEmptyRows = (data: IData) => {
  const rows = Math.ceil(data.sections.length / data.columns);
  for (let row = rows - 1; row >= 0; row--) {
    let rowIsEmpty = true;
    for (let col = 0; col < data.columns; col++) {
      const index = row * data.columns + col;
      const sectionToCheck = data.sections[index];
      if (sectionToCheck.title || sectionToCheck.text) {
        rowIsEmpty = false;
        break;
      }
    }
    if (rowIsEmpty) {
      data.sections.splice(row * data.columns, data.columns);
    } else {
      break;
    }
  }
};

