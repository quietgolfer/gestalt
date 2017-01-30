// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import Caret from './Caret';
import IconButton from '../IconButton/IconButton';
import styles from './InnerFlyout.css';

const cx = classnames.bind(styles);

/* Needed until this Flow issue is fixed: https://github.com/facebook/flow/issues/380 */
/* eslint quote-props: 0*/
const SPACES_INDEX_MAP = {
  '0': 'up',
  '1': 'right',
  '2': 'down',
  '3': 'left',
};

const DIR_INDEX_MAP = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

const MARGIN = 24;
export const CARET_HEIGHT = 24;
const CARET_OFFSET_FROM_SIDE = 24;
const BORDER_RADIUS = 8;

type IdealDir = ?('up' | 'right' | 'down' | 'left');
type MainDir = IdealDir | 'none';
type SubDir = 'up' | 'right' | 'down' | 'left' | 'middle';

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
};

type Size = {
  height: number,
  width: number,
};

type Props = {
  children?: any,
  closeLabel: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onClick: (e: Event) => void,
  onDismiss: () => void,
  onKeyDown: (e: { keyCode: number }) => void,
  onResize: () => void,
  triggerRect: ClientRect,
  width: number,
};

type State = {
  flyoutOffset: {
    top: ?number,
    right: ?number,
    bottom: ?number,
    left: ?number,
  },
  caretOffset: {
    top: ?number,
    right: ?number,
    bottom: ?number,
    left: ?number,
  },
  mainDir: ?MainDir,
  subDir: ?SubDir,
}

/**
 * Determines the main direction the flyout opens
 */
export function getMainDir(flyoutSize: Size, idealDirection: IdealDir,
                           triggerRect: ClientRect, windowSize: Size) {
  // Should display mobile version if flyout width is larger than the window width
  if (flyoutSize.width > windowSize.width) {
    return 'none';
  }
  // Calculates the available space if we were to place the flyout in the 4 main directions
  // to determine which 'quadrant' to position the flyout inside of
  let up = triggerRect.top - flyoutSize.height - CARET_HEIGHT;
  let right = windowSize.width - flyoutSize.width - CARET_HEIGHT - triggerRect.right;
  let down = windowSize.height - flyoutSize.height - CARET_HEIGHT - triggerRect.bottom;
  let left = triggerRect.left - flyoutSize.width - CARET_HEIGHT;

  // overrides available space when the trigger is close to the edge of the screen
  // trigger is too close to top/bottom of screen for left & right flyouts
  if (triggerRect.top < BORDER_RADIUS
    || windowSize.height - triggerRect.bottom < BORDER_RADIUS) {
    left = 0;
    right = 0;
  }

  // trigger is too close to the left/right of screen for up & down flyouts
  if (triggerRect.left < BORDER_RADIUS
    || windowSize.width - triggerRect.right < BORDER_RADIUS) {
    up = 0;
    down = 0;
  }

  const spaces = [up, right, down, left];

  // Identify best direction of available spaces
  const max = Math.max(...spaces);

  // Chose the main direction for the flyout based on available spaces & user preference
  let mainDir;
  if (max <= 0) { // flyout will not fit on the screen, return 'none' for mobile version
    mainDir = 'none';
  } else if (idealDirection && spaces[DIR_INDEX_MAP[idealDirection]] > 0) { // user pref
    mainDir = idealDirection;
  } else { // If no direction pref, chose the direction in which there is the most space available
    mainDir = SPACES_INDEX_MAP[spaces.indexOf(max)];
  }
  return mainDir;
}

/**
 * Determines the sub direction of how the flyout is positioned within the main dir
 */
export function getSubDir(flyoutSize: Size, mainDir: MainDir,
                          triggerRect: ClientRect, windowSize: Size) {
  // Now that we have the main direction, chose from 3 caret placements for that direction
  let offset;
  let triggerMid;
  let windowSpaceAvailable;

  if (mainDir === 'right' || mainDir === 'left') {
    offset = flyoutSize.height / 2;
    triggerMid = triggerRect.top + ((triggerRect.bottom - triggerRect.top) / 2);
    windowSpaceAvailable = windowSize.height;
  } else { // (mainDir === 'up' || mainDir === 'down')
    offset = flyoutSize.width / 2;
    triggerMid = triggerRect.left + ((triggerRect.right - triggerRect.left) / 2);
    windowSpaceAvailable = windowSize.width;
  }

  const aboveOrLeft = triggerMid - offset - MARGIN;
  const belowOrRight = windowSpaceAvailable - triggerMid - offset - MARGIN;
  let subDir;
  if (aboveOrLeft > 0 && belowOrRight > 0) { // caret should go in middle b/c it can
    subDir = 'middle';
  } else if (belowOrRight > 0) { // caret should go at top for left/right and left for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'up' : 'left';
  } else { // caret should go at bottom for left/right and right for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'down' : 'right';
  }
  return subDir;
}

/**
 * Calculates the amount the flyout & caret need to shift over to align with designs
 */
export function calcEdgeShifts(subDir: SubDir, triggerRect: ClientRect, windowSize: Size) {
  // Target values for flyout and caret shifts
  let flyoutVerticalShift = CARET_OFFSET_FROM_SIDE - ((triggerRect.height - CARET_HEIGHT) / 2);
  let flyoutHorizontalShift = CARET_OFFSET_FROM_SIDE - ((triggerRect.width - CARET_HEIGHT) / 2);
  let caretVerticalShift = CARET_HEIGHT;
  let caretHorizontalShift = CARET_HEIGHT;

  if (subDir === 'up') {
    flyoutVerticalShift += triggerRect.height;
  }

  // Covers edge case where trigger is in a corner and we need to adjust the offset of the caret
  // to something smaller than normal in order
  if (triggerRect.top < CARET_OFFSET_FROM_SIDE
      || windowSize.height - triggerRect.bottom < CARET_OFFSET_FROM_SIDE) {
    flyoutVerticalShift = BORDER_RADIUS + triggerRect.height;
    caretVerticalShift = ((triggerRect.height - CARET_HEIGHT) / 2) + BORDER_RADIUS;
  }
  if (triggerRect.left < CARET_OFFSET_FROM_SIDE
      || windowSize.width - triggerRect.right < CARET_OFFSET_FROM_SIDE) {
    flyoutHorizontalShift = BORDER_RADIUS;
    caretHorizontalShift = ((triggerRect.width - CARET_HEIGHT) / 2) + BORDER_RADIUS;
  }
  return {
    flyoutShift: {
      x: flyoutHorizontalShift,
      y: flyoutVerticalShift,
    },
    caretShift: {
      x: caretHorizontalShift,
      y: caretVerticalShift,
    },
  };
}

/**
 * Calculates flyout and caret offsets for styling
 */
export function calcOffsets(flyoutSize: Size, mainDir: MainDir, subDir: SubDir,
                            triggerRect: ClientRect, windowSize: Size) {
  let flyoutTop = mainDir === 'down' ? CARET_HEIGHT / 2 : null;
  let flyoutRight = mainDir === 'left' ? triggerRect.width + (CARET_HEIGHT / 2) : null;
  let flyoutBottom = mainDir === 'up' ? triggerRect.height + (CARET_HEIGHT / 2) : null;
  let flyoutLeft = mainDir === 'right' ? triggerRect.width + (CARET_HEIGHT / 2) : null;

  let caretTop = mainDir === 'down' ? -CARET_HEIGHT : null;
  let caretRight = mainDir === 'left' ? -CARET_HEIGHT : null;
  let caretBottom = null;
  let caretLeft = mainDir === 'right' ? -CARET_HEIGHT : null;

  const { caretShift, flyoutShift } = calcEdgeShifts(subDir, triggerRect, windowSize);

  if (subDir === 'left') {
    flyoutLeft = -flyoutShift.x;
    caretLeft = caretShift.x;
  } else if (subDir === 'right') {
    flyoutRight = -flyoutShift.x;
    caretRight = caretShift.x;
  } else if (subDir === 'up') {
    flyoutTop = -flyoutShift.y;
    caretTop = caretShift.y;
  } else if (subDir === 'down') {
    flyoutBottom = -flyoutShift.y;
    caretBottom = caretShift.y;
  } else if (subDir === 'middle' && (mainDir === 'left' || mainDir === 'right')) {
    flyoutTop = -(flyoutSize.height + triggerRect.height) / 2;
    caretTop = (flyoutSize.height - CARET_HEIGHT) / 2;
  } else if (subDir === 'middle' && (mainDir === 'up' || mainDir === 'down')) {
    flyoutRight = -(flyoutSize.width - triggerRect.width) / 2;
    caretRight = (flyoutSize.width - CARET_HEIGHT) / 2;
  }

  return {
    flyoutOffset: {
      top: flyoutTop,
      right: flyoutRight,
      bottom: flyoutBottom,
      left: flyoutLeft,
    },
    caretOffset: {
      top: caretTop,
      right: caretRight,
      bottom: caretBottom,
      left: caretLeft,
    },
  };
}

export default class InnerFlyout extends Component {

  state: State = {
    flyoutOffset: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    },
    caretOffset: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    },
    mainDir: null,
    subDir: null,
  };

  componentDidMount() {
    this.setFlyoutPosition();
    document.addEventListener('click', this.props.onClick);
    window.addEventListener('resize', this.props.onResize);
    window.addEventListener('keydown', this.props.onKeyDown);
  }

  componentWillReceiveProps() {
    this.setFlyoutPosition();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClick);
    window.removeEventListener('resize', this.props.onResize);
    window.removeEventListener('keydown', this.props.onKeyDown);
  }

  /**
   * Determines the main direciton, sub direction, and corresponding offsets needed
   * to correctly position the offset
   */
  setFlyoutPosition = () => {
    const { idealDirection, width, triggerRect } = this.props;
    const windowSize = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    const flyoutSize = {
      height: this.flyout.clientHeight,
      width,
    };

    // First choose one of 4 main direction
    const mainDir = getMainDir(flyoutSize, idealDirection, triggerRect, windowSize);

    // Flyout will not fit in any direction, so we skip calculating the offsets
    // and subDir and just set the state for main since that is all we need to know
    if (mainDir === 'none') {
      this.setState({ mainDir });
      return;
    }

    // Now that we have the main direction, chose from 3 caret placements for that direction
    const subDir = getSubDir(flyoutSize, mainDir, triggerRect, windowSize);

    // Then calculate the correct offsets to place the flyout in the right position
    const {
      flyoutOffset,
      caretOffset } = calcOffsets(flyoutSize, mainDir, subDir, triggerRect, windowSize);

    this.setState({
      caretOffset,
      flyoutOffset,
      mainDir,
      subDir,
    });
  }

  props: Props;
  flyout: HTMLElement;

  render() {
    const { children, closeLabel, width } = this.props;

    // Needed to prevent UI thrashing
    const visibility = this.state.mainDir === null ? 'hidden' : 'visible';

    // show mobile flyout if it won't fit on a normal screen
    const flyout = this.state.mainDir === 'none' ?
      (
        <div>
          <div className={cx('fixed', 'left-0', 'top-0', 'Flyout-overlay')} />
          <div
            className={cx('bg-white', 'block', 'border', 'border-box', 'bottom-0', 'fixed', 'left-0', 'Flyout-mobile', 'overflow-scroll')}
            ref={(c) => { this.flyout = c; }}
          >
            <div className={cx('absolute', 'right-0', 'top-0')}>
              <IconButton icon="cancel" label={closeLabel} onClick={this.props.onDismiss} />
            </div>
            <div style={{ width }}>
              {children}
            </div>
          </div>
        </div>
      ) : (// regular flyout with caret and positioning
        <div
          className={cx('absolute', 'bg-white', 'block', 'border', 'border-box', 'rounded', 'Flyout-dimensions')}
          style={this.state.flyoutOffset}
          ref={(c) => { this.flyout = c; }}
        >
          <div className={cx('overflow-scroll', 'Flyout-dimensions')} style={{ width }}>
            {children}
          </div>
          <div className={cx('absolute', 'Flyout-caret')} style={this.state.caretOffset}>
            <Caret direction={this.state.mainDir} />
          </div>
        </div>
    );

    return (
      <div className={cx('relative')} style={{ visibility }}>
        {flyout}
      </div>
    );
  }
}

/* eslint react/no-unused-prop-types: 0 */
InnerFlyout.propTypes = {
  children: PropTypes.node,
  closeLabel: PropTypes.string.isRequired,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onClick: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  triggerRect: PropTypes.shape({
    bottom: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
  }),
  width: PropTypes.number,
};
