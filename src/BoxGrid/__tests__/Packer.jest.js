/* global describe */
/* global expect */
/* global jest */
/* global it */
jest.unmock('../Packer');

import Packer from '../Packer';

function getPacker() {
  const p = new Packer();
  p.init({ colCount: 3, gridWidth: 300, itemWidth: 100 });
  return p;
}

describe('Packer', () => {
  describe('#splitAllSlots', () => {
    it('splits all slots', () => {
      const p = getPacker();
      const slots = [[0, 0, 0], [1, 0, 0], [2, 0, 0]];
      const itemHeight = 400;
      p.splitAllSlots(slots, itemHeight);

      expect(p.columns[0].length).toEqual(1);
      expect(p.columns[1].length).toEqual(1);
      expect(p.columns[2].length).toEqual(1);

      expect(p.columns[0][0].startY).toEqual(401);
      expect(p.columns[1][0].startY).toEqual(401);
      expect(p.columns[2][0].startY).toEqual(401);
    });

    it('when an offset exists within the slot', () => {
      const p = getPacker();

      // The second column has an item, but no other column does.
      p.columns[1][0].startY = 100;

      // Offset slots by a number greater than the startY of the second column.
      const slots = [[0, 0, 100], [1, 0, 0], [2, 0, 100]];
      const itemHeight = 200;
      p.splitAllSlots(slots, itemHeight);

      expect(p.columns[0].length).toEqual(2);
      expect(p.columns[1].length).toEqual(1);
      expect(p.columns[2].length).toEqual(2);
    });
  });

  describe('#findNextShortest', () => {
    const p = getPacker();

    it('first column, first item', () => {
      const result = p.findNextShortest(-1);
      expect(result).toEqual([0, 0]);
    });

    it('first column, first item, after startY has increased', () => {
      p.columns[0][0].startY = 100;
      const result = p.findNextShortest(0);
      expect(result).toEqual([0, 0]);
    });

    it('second column, first item', () => {
      const result = p.findNextShortest(-1);
      expect(result).toEqual([1, 0]);
    });

    it('first column, first item, after heights have increased', () => {
      p.columns[0][0].startY = 200;
      p.columns[1][0].startY = 200;
      p.columns[2][0].startY = 200;

      const result = p.findNextShortest(100);
      expect(result).toEqual([0, 0]);
    });
  });

  describe('#columnHasSlotAt', () => {
    it('first column, first item', () => {
      const p = getPacker();
      const result = p.columnHasSlotAt(0, 0, 100);
      expect(result).toEqual(0);
    });

    it('first column, first item, tall item', () => {
      const p = getPacker();
      const result = p.columnHasSlotAt(0, 100, 1000);
      expect(result).toEqual(0);
    });

    it('first column, second item', () => {
      const p = getPacker();
      p.columns[0][0].endY = 100;
      p.columns[0].push({
        startX: 0,
        startY: 101,
        endY: null,
      });
      const result = p.columnHasSlotAt(0, 101, 1000);
      expect(result).toEqual(1);
    });

    it('second column, first item', () => {
      const p = getPacker();
      const result = p.columnHasSlotAt(1, 1000, 10000);
      expect(result).toEqual(0);
    });

    it('first item of column when column has following items', () => {
      const p = getPacker();
      p.columns[0][0].endY = 300;
      p.columns[0].push({
        startX: 0,
        startY: 500,
        endY: null,
      });
      const result = p.columnHasSlotAt(0, 100, 200);
      expect(result).toEqual(0);
    });

    it('null when the item can not fit', () => {
      const p = getPacker();
      p.columns[0][0].endY = 300;
      p.columns[0].push({
        startX: 0,
        startY: 500,
        endY: null,
      });
      const result = p.columnHasSlotAt(0, 100, 400);
      expect(result).toEqual(null);
    });

    it('second item of column when column has many items', () => {
      const p = getPacker();
      p.columns[0][0].endY = 300;
      p.columns[0].push({
        startX: 0,
        startY: 500,
        endY: null,
      });
      const result = p.columnHasSlotAt(0, 500, 400);
      expect(result).toEqual(1);
    });
  });

  describe('#findAvailableSlots', () => {
    it('Starts at top, and fills the first slot.', () => {
      const p = getPacker();
      const slots = p.findAvailableSlots(0, 0, 1, 100);
      expect(slots).toEqual([[0, 0, 0]]);
    });

    it('Starts at top, and fills two slot2.', () => {
      const p = getPacker();
      const slots = p.findAvailableSlots(0, 0, 2, 250);
      expect(slots).toEqual([[0, 0, 0], [1, 0, 0]]);
    });

    it('Starts at top, and fills three slots.', () => {
      const p = getPacker();
      const slots = p.findAvailableSlots(0, 0, 3, 400);
      expect(slots).toEqual([[0, 0, 0], [1, 0, 0], [2, 0, 0]]);
    });

    it('First slot taken, try to fill three slots from first item slot', () => {
      const p = getPacker();
      p.columns[0][0].endY = 100;
      p.columns[0].push({
        startX: 0,
        startY: 101,
        endY: null,
      });

      const expectedSlots = 3;
      const slots = p.findAvailableSlots(0, 0, expectedSlots, 400);
      expect(slots.length).toEqual(expectedSlots - 1);
    });

    it('First slot taken, try to fill three slots from second item slot', () => {
      const p = getPacker();
      p.columns[0][0].endY = 100;
      p.columns[0].push({
        startX: 0,
        startY: 101,
        endY: null,
      });

      const expectedSlots = 3;
      const slots = p.findAvailableSlots(0, 1, expectedSlots, 400);
      expect(slots).toEqual([[0, 1, 0], [1, 0, 101], [2, 0, 101]]);
    });

    it('First slot taken, try to fill two slots from second column', () => {
      const p = getPacker();
      p.columns[0][0].endY = 100;
      p.columns[0].push({
        startX: 0,
        startY: 101,
        endY: null,
      });

      const expectedSlots = 2;
      const slots = p.findAvailableSlots(1, 0, expectedSlots, 400);
      expect(slots).toEqual([[1, 0, 0], [2, 0, 0]]);
    });

    it('Offset is set correctly per column', () => {
      const p = getPacker();
      const expectedSlots = 3;
      p.columns[1][0].startY = 100;
      const slots = p.findAvailableSlots(0, 0, expectedSlots, 400, 100);
      expect(slots).toEqual([[0, 0, 100], [1, 0, 0], [2, 0, 100]]);
    });
  });

  describe('#position', () => {
    it('Positions three items in two rows correctly', () => {
      const p = getPacker();
      const firstItemPos = p.position(100, 100, 1);
      expect(firstItemPos.top).toEqual(0);
      expect(firstItemPos.left).toEqual(0);

      const secondItemPos = p.position(200, 100, 2);
      expect(secondItemPos.top).toEqual(0);
      expect(secondItemPos.left).toEqual(100);

      const thirdItemPos = p.position(300, 100, 3);
      expect(thirdItemPos.top).toEqual(101);
      expect(thirdItemPos.left).toEqual(0);
    });

    it('Positions a three col item, when something exists in col two', () => {
      const p = getPacker();
      p.columns[1][0].startY = 100;
      const itemPos = p.position(300, 100, 3);
      expect(itemPos.top).toEqual(100);
      expect(itemPos.left).toEqual(0);
    });

    it('Positions a two col item, when something exists in col one and two', () => {
      const p = getPacker();
      p.columns[0][0].startY = 150;
      p.columns[1][0].startY = 100;
      p.columns[2][0].startY = 1000;

      // Item 4
      let itemPos = p.position(200, 100, 2);
      expect(itemPos.top).toEqual(150);
      expect(itemPos.left).toEqual(0);
      expect(p.columns[0][0].startY).toEqual(251);
      expect(p.columns[0][0].endY).toEqual(null);

      // Item 5
      itemPos = p.position(100, 200, 1);
      expect(itemPos.top).toEqual(251);
      expect(itemPos.left).toEqual(0);

      expect(p.columns[1][0].startY).toEqual(100);
      expect(p.columns[1][0].endY).toEqual(150);
      expect(p.columns[1][1].startY).toEqual(251);
      expect(p.columns[1][1].endY).toEqual(null);

      // Item 6 - A thin item that will fit in the thin slice in column 2.
      itemPos = p.position(100, 25, 1);
      expect(p.columns[1][0].startY).toEqual(126);
      expect(p.columns[1][0].endY).toEqual(150);
    });
  });
});
