import {DataVersion, NienowGrid} from './constants';
import {IData} from './definitions';

export const transformEditorData = (text?: string): IData => {
  if (!text) {
    return newData('');
  }
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

export const newData = (text?: string): IData => {
  return {
    editor: NienowGrid,
    version: DataVersion,
    columns: 2,
    title: true,
    sections: [{text: text || ''}, {}, {}, {}]
  };
};
