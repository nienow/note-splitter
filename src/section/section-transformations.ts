import {DataVersion, NienowSection} from '../constants';
import {IData} from '../definitions';

export const newEditorData = (text): IData => {
  return {
    editor: NienowSection,
    version: DataVersion,
    title: false,
    columns: 1,
    sections: [{text: text || ''}]
  };
};

export const makeSectionsFillRows = (data: IData) => {
  let lonelySections = data.sections.length % data.columns;
  if (lonelySections) {
    const firstIndex = data.sections.length - lonelySections;
    for (let i = data.sections.length - 1; i >= firstIndex; i--) {
      const sectionToCheck = data.sections[i];
      if (!sectionToCheck.title && !sectionToCheck.text) {
        data.sections.splice(i, 1);
      } else {
        break;
      }
    }
    lonelySections = data.sections.length % data.columns;
    if (lonelySections) {
      const fillCount = data.columns - lonelySections;
      for (let i = 0; i < fillCount; i++) {
        const newTab = {text: ''};
        data.sections.push(newTab);
      }
    }
  }
};

export const clearEmptySections = (data: IData) => {
  for (let i = data.sections.length - 1; i >= 0; i--) {
    const sectionToCheck = data.sections[i];
    if (!sectionToCheck.title && !sectionToCheck.text) {
      data.sections.splice(i, 1);
    }
  }
  makeSectionsFillRows(data);
};
