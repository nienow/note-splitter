import {transformFromServer, transformToServer} from './sticky-transformations';

describe('sticky transformations', () => {
  test('transform from server', () => {
    const result = transformFromServer({
      editor: 'nienow.sticky',
      version: 1,
      columns: 2,
      sections: [
        {title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'},
        {title: 'title3', text: 'text3'}, {title: 'title4', text: 'text4'}
      ]
    });

    expect(result).toEqual({
      editor: 'nienow.sticky',
      version: 1,
      columns: 2,
      sections: {
        0: {index: 0, title: 'title1', text: 'text1'},
        1: {index: 1, title: 'title2', text: 'text2'},
        2: {index: 2, title: 'title3', text: 'text3'},
        3: {index: 3, title: 'title4', text: 'text4'}
      }
    });
  });

  test('transform to server', () => {
    const originalData = {
      editor: 'nienow.sticky',
      version: 1,
      columns: 2,
      sections: [
        {title: 'title2', text: 'text2'}
      ]
    };
    transformToServer(originalData, {
      editor: 'nienow.sticky',
      version: 1,
      columns: 2,
      sections: {
        0: {index: 0, title: 'title1', text: 'text1'},
        1: {index: 1, title: 'title2', text: 'text2'},
        2: {index: 2, title: 'title3', text: 'text3'},
        3: {index: 3, title: 'title4', text: 'text4'}
      }
    });

    expect(originalData).toEqual({
      editor: 'nienow.sticky',
      version: 1,
      columns: 2,
      sections: [
        {title: 'title1', text: 'text1'}, {title: 'title2', text: 'text2'},
        {title: 'title3', text: 'text3'}, {title: 'title4', text: 'text4'}
      ]
    });
  });
});
