import {makeSectionsFillRows} from './transformations';
import {IData} from './definitions';

const section0 = {title: '0'};
const section1 = {title: '1'};
const section2 = {title: '2'};
const section3 = {title: '3'};

describe('section transformations', () => {
  describe('makeSectionsFillRows', () => {
    it('should handle changing from 1 to 2 columns with 1 rows', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 2,
        sections: [
          section0
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(2);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual({});
    });

    it('should handle changing from 1 to 2 columns with 2 rows', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 2,
        sections: [
          section0, section1
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(2);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
    });

    it('should handle changing from 1 to 2 columns with 3 rows', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 2,
        sections: [
          section0, section1, section2
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(4);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
      expect(data.sections[2]).toEqual(section2);
      expect(data.sections[3]).toEqual({});
    });

    it('should handle changing from 2 to 3 columns with 1 row', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 3,
        sections: [
          section0,
          {}
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(3);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual({});
      expect(data.sections[2]).toEqual({});
    });

    it('should handle changing from 2 to 3 columns with 2 rows & empty section', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 3,
        sections: [
          section0,
          section1,
          section2,
          {}
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(3);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
      expect(data.sections[2]).toEqual(section2);
    });

    it('should handle changing from 2 to 3 columns with 2 rows', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 3,
        sections: [
          section0,
          section1,
          section2,
          section3
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(6);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
      expect(data.sections[2]).toEqual(section2);
      expect(data.sections[3]).toEqual(section3);
      expect(data.sections[4]).toEqual({});
      expect(data.sections[5]).toEqual({});
    });

    it('should handle changing from 3 to 2 columns with 1 row', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 2,
        sections: [
          section0,
          section1,
          section2
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(4);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
      expect(data.sections[2]).toEqual(section2);
      expect(data.sections[3]).toEqual({});
    });

    it('should handle changing from 3 to 2 columns with 1 row & empty section', () => {
      const data: IData = {
        editor: '',
        version: 1,
        columns: 2,
        sections: [
          section0,
          section1,
          {}
        ]
      };
      makeSectionsFillRows(data);
      expect(data.sections.length).toEqual(2);
      expect(data.sections[0]).toEqual(section0);
      expect(data.sections[1]).toEqual(section1);
    });
  });
});
