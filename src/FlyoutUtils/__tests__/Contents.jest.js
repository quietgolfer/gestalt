/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Contents');

import React from 'react';
import { shallow } from 'enzyme';
import Contents, { getMainDir, getSubDir, calcEdgeShifts, calcOffsets, CARET_HEIGHT } from '../Contents';

const windowSize = {
  height: 900,
  width: 1440,
};

const flyoutSize = {
  height: 360,
  width: 180,
};

const centerTriggerRect = (props = {}) => ({
  bottom: 470,
  height: 40,
  left: 700,
  right: 740,
  top: 430,
  width: 40,
  ...props,
});

const upperMiddleTriggerRect = (props = {}) => ({
  bottom: 40,
  height: 40,
  left: 700,
  right: 740,
  top: 0,
  width: 40,
  ...props,
});

// between BORDER_RADIUS & CARET_HEIGHT away from the edge of the scrren
const upperLeftTriggerRect = (props = {}) => ({
  bottom: 50,
  height: 40,
  left: 10,
  right: 50,
  top: 10,
  width: 40,
  ...props,
});

const idealDirections = ['up', 'right', 'down', 'left'];

describe('Contents', () => {
  describe('Main Direction chosen correctly', () => {
    it('Chooses the main direction as idealDirection when it fits on screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach((idealDir) => {
        const mainDir = getMainDir(flyoutSize, idealDir, triggerRect, windowSize);
        expect(mainDir).toEqual(idealDir);
      });
    });


    it('Opens down when the trigger is too close to the top of screen', () => {
      const triggerRect = centerTriggerRect({ bottom: 40, top: 0 });
      idealDirections.forEach((idealDir) => {
        const mainDir = getMainDir(flyoutSize, idealDir, triggerRect, windowSize);
        expect(mainDir).toEqual('down');
      });
    });

    it('Opens up when the trigger is too close to the bottom of screen', () => {
      const triggerRect = centerTriggerRect({
        bottom: windowSize.height,
        top: windowSize.height - 40,
      });
      idealDirections.forEach((idealDir) => {
        const mainDir = getMainDir(flyoutSize, idealDir, triggerRect, windowSize);
        expect(mainDir).toEqual('up');
      });
    });


    it('Chooses the direction in which there is the most space if idealDirection is not given', () => {
      const triggerRect = upperMiddleTriggerRect({ left: 40, right: 80 });
      const mainDir = getMainDir(flyoutSize, null, triggerRect, windowSize);
      expect(mainDir).toEqual('down');
    });
  });


  describe('Sub direction chosen correctly', () => {
    it('Chooses the middle as sub direction when it fits on the screen', () => {
      const triggerRect = centerTriggerRect();
      idealDirections.forEach((idealDir) => {
        const subDir = getSubDir(flyoutSize, idealDir, triggerRect, windowSize);
        expect(subDir).toEqual('middle');
      });
    });
  });


  describe('Offsets chosen correctly', () => {
    it('Calculates Container offsets correctly for left-middle flyouts', () => {
      const triggerRect = centerTriggerRect();
      const mainDir = 'left';
      const subDir = 'middle';
      const expectedFlyoutOffset = {
        top: -(flyoutSize.height + triggerRect.height) / 2,
        right: triggerRect.width + (CARET_HEIGHT / 2),
        bottom: null,
        left: null,
      };
      const expectedCaretOffset = {
        top: (flyoutSize.height - CARET_HEIGHT) / 2,
        right: -CARET_HEIGHT,
        bottom: null,
        left: null,
      };
      const {
        flyoutOffset,
        caretOffset } = calcOffsets(flyoutSize, mainDir, subDir, triggerRect, windowSize);
      expect(flyoutOffset).toEqual(expectedFlyoutOffset);
      expect(caretOffset).toEqual(expectedCaretOffset);
    });
  });


  describe('Edge shifts calculated correctly', () => {
    it('Keeps Container on screen when trigger is on the edge', () => {
      const triggerRect = upperLeftTriggerRect();
      const subDir = 'up';
      const { flyoutShift } = calcEdgeShifts(subDir, triggerRect, windowSize);
      expect(triggerRect.bottom - flyoutShift.y).toBeGreaterThan(0);
    });

    it('Shifts Container at least the height of the trigger for up sub direction', () => {
      const triggerRect = centerTriggerRect();
      const subDir = 'up';
      const { flyoutShift } = calcEdgeShifts(subDir, triggerRect, windowSize);
      expect(flyoutShift.y).toBeGreaterThanOrEqual(triggerRect.height);
    });
  });


  describe('Regular version display checks', () => {
    it('Renders caret in if screen is large enough to render normal Container', () => {
      const triggerRect = centerTriggerRect();
      const wrapper = shallow(
        <Contents
          closeLabel="close"
          onClick={jest.fn()}
          onDismiss={jest.fn()}
          onKeyDown={jest.fn()}
          onResize={jest.fn()}
          triggerRect={triggerRect}
          width={flyoutSize.width}
        />
      );
      wrapper.instance().setState({ mainDir: 'left' });
      expect(wrapper.find('IconButton').length).toEqual(0);
      expect(wrapper.find('Caret').length).toEqual(1);
    });
  });
});
