import {ISectionData} from './section-definitions';
import {DataVersion, NienowSection, NienowTab} from '../constants';
import {ITabData} from '../tab/tab-definitions';

export const newEditorData = (text): ISectionData => {
  return {
    editor: NienowSection,
    version: DataVersion,
    title: false,
    columns: 1,
    sections: [{text: text || ''}]
  };
};

export const transformEditorData = (text: string): ISectionData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowSection && parsedData.version === 1) {
          parsedData.columns = parsedData.columns || 1;
          return parsedData;
        } else if (parsedData.editor === NienowTab && parsedData.version === 1) {
          return transformFromTab(parsedData);
        }
      } catch (e) {
        console.error(e);
      }
      return null;
    }
  } else {
    return newEditorData(text);
  }
};

export const transformFromTab = (data: ITabData) => {
  return {
    editor: NienowSection,
    version: 1,
    title: true,
    columns: 1,
    sections: data.tabs
  };
};

export const makeSectionsFillRows = (data: ISectionData) => {
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

export const clearEmptySections = (data: ISectionData) => {
  for (let i = data.sections.length - 1; i >= 0; i--) {
    const sectionToCheck = data.sections[i];
    if (!sectionToCheck.title && !sectionToCheck.text) {
      data.sections.splice(i, 1);
    }
  }
  makeSectionsFillRows(data);
};
