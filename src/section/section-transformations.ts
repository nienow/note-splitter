import {IData} from '../definitions';

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
    }
  }
  // makeSectionsFillRows(data);
};
