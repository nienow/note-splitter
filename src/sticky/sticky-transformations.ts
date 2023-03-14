import {IData, ISection} from '../definitions';

export interface IStickySection extends ISection {
  index: number;
}

export interface IStickyData extends IData {
  sections: IStickySection[];
}

export const transformFromServer = (originalData) => {
  const transformedData = {
    ...originalData,
    sections: {}
  };
  const keyPrefix = new Date().getTime();
  originalData.sections.forEach((section, i) => {
    transformedData.sections[keyPrefix + i] = {
      ...section,
      index: i
    };
  });
  return transformedData;
};

export const transformToServer = (originalData, transformedData) => {
  originalData.sections = Object.values(transformedData.sections)
    .sort((a: IStickySection, b: IStickySection) => {
      return a.index - b.index;
    }).map((section: IStickySection) => {
      return {
        title: section.title,
        text: section.text
      };
    });
};
