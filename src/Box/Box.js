// @flow
/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import styles from './Box.css';


// --


const contains = (key, arr) => arr.indexOf(key) >= 0;
const omit = (keys, obj) => Object.keys(obj).reduce((acc, k) => {
  if (contains(k, keys)) {
    return acc;
  }
  return {
    ...acc,
    [k]: obj[k],
  };
}, {});


// --


/*

  Style is a monoid. Two assertions hold true:

    1. concat(concat(a, b), c) === concat(a, concat(b, c));
    2. concat(identity(), a) === concat(a, identity()) === a;

*/
type Style = Set<string>;

const fromClassName = (...classNames): Style => new Set(classNames);
const identity = (): Style => new Set();
// TODO: Array.from is just to appease flow
// https://github.com/facebook/flow/issues/1059
const concat = (...stylesToConcat: Array<Style>): Style => new Set(
  stylesToConcat.map(s => Array.from(s)).reduce((acc, s) => acc.concat(s), [])
);
const map = (fn: ((x: string) => string), style: Style): Style => (
  new Set(Array.from(style).map(fn))
);
const prefix = s => style => map(className => `${s}-${className}`, style);


// --


type NatBoint = 1 | 2 | 3 | 4 | 5 | 6;
type IntBoint = -6 | -5 | -4 | -3 | -2 | -1 | NatBoint;


// --


type Display = boolean | 'flex' | 'flexColumn' | 'inlineBlock';
const display = (value: Display): Style => {
  switch (value) {
    case 'flex':
      return fromClassName('flex');
    case 'flexColumn':
      return fromClassName('flex-column');
    case 'inlineBlock':
      return fromClassName('inline-block');
    case false:
      return fromClassName('hide');
    default /* static */:
      return identity();
  }
};

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const column = (value: Column): Style => (
  value ? fromClassName(`col-${value}`) : identity()
);

type ResponsiveProps = { column?: Column, display?: Display };

const xs = (value: ResponsiveProps): Style => {
  if (!value) { return identity(); }
  return map(c => styles[c], prefix('xs')(concat(
    value.column ? column(value.column) : identity(),
    value.display ? display(value.display) : identity()
  )));
};

const sm = (value: ResponsiveProps): Style => {
  if (!value) { return identity(); }
  return map(c => styles[c], prefix('sm')(concat(
    value.column ? column(value.column) : identity(),
    value.display ? display(value.display) : identity()
  )));
};

const md = (value: ResponsiveProps): Style => {
  if (!value) { return identity(); }
  return map(c => styles[c], prefix('md')(concat(
    value.column ? column(value.column) : identity(),
    value.display ? display(value.display) : identity()
  )));
};

const lg = (value: ResponsiveProps): Style => {
  if (!value) { return identity(); }
  return map(c => styles[c], prefix('lg')(concat(
    value.column ? column(value.column) : identity(),
    value.display ? display(value.display) : identity()
  )));
};

// --


type Margin = IntBoint | {
  top?: IntBoint,
  right?: IntBoint | 'auto',
  bottom?: IntBoint,
  left?: IntBoint | 'auto',
};

const formatIntBoint = x => (x < 0 ? `n${Math.abs(x)}` : x.toString());
const margin = (value: Margin) => {
  let mt = identity();
  let mb = identity();
  let ml = identity();
  let mr = identity();
  switch (typeof value) {
    case 'number':
      return fromClassName(`m${formatIntBoint(value)}`);
    case 'object':
      if (value.top) {
        mt = fromClassName(`mt${formatIntBoint(value.top)}`);
      }

      if (value.bottom) {
        mb = fromClassName(`mb${formatIntBoint(value.bottom)}`);
      }

      if (value.left) {
        ml = fromClassName(
          value.left === 'auto' ? styles['ml-auto'] : `ml${formatIntBoint(value.left)}`
        );
      }

      if (value.right) {
        mr = fromClassName(
          value.right === 'auto' ? styles['mr-auto'] : `mr${formatIntBoint(value.right)}`
        );
      }
      return concat(mt, mb, ml, mr);
    default:
      return identity();
  }
};

type Padding = NatBoint | { x?: NatBoint, y?: NatBoint };

const padding = (value: Padding): Style => {
  switch (typeof value) {
    case 'number':
      return fromClassName(`p${value}`);
    case 'object':
      return concat(
        (value.x ? fromClassName(`px${value.x}`) : identity()),
        (value.y ? fromClassName(`py${value.y}`) : identity())
      );
    default:
      return identity();
  }
};

type Position = 'static' | 'absolute' | 'relative' | 'fixed';

const position = (value: Position): Style => {
  switch (value) {
    case 'absolute':
      return fromClassName('absolute');
    case 'relative':
      return fromClassName('relative');
    case 'fixed':
      return fromClassName('fixed');
    default /* static */:
      return identity();
  }
};

type Top = boolean;

const top = (value: Top): Style => (
  value ? fromClassName('top-0') : identity()
);

type Bottom = boolean;

const bottom = (value: Bottom): Style => (
  value ? fromClassName('bottom-0') : identity()
);

type Left = boolean;

const left = (value: Left): Style => (
  value ? fromClassName('left-0') : identity()
);

type Right = boolean;

const right = (value: Right): Style => (
  value ? fromClassName('right-0') : identity()
);

type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

const alignItems = (value: AlignItems): Style => {
  switch (value) {
    case 'start':
      return fromClassName('items-start');
    case 'end':
      return fromClassName('items-end');
    case 'center':
      return fromClassName('items-center');
    case 'baseline':
      return fromClassName('items-baseline');
    default /* stretch */:
      return identity();
  }
};

type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around';

const justifyContent = (value: JustifyContent): Style => {
  switch (value) {
    case 'end':
      return fromClassName('justify-end');
    case 'center':
      return fromClassName('justify-center');
    case 'between':
      return fromClassName('justify-between');
    case 'around':
      return fromClassName('justify-around');
    default /* start */:
      return identity();
  }
};

type AlignContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';

const alignContent = (value: AlignContent): Style => {
  switch (value) {
    case 'start':
      return fromClassName('content-start');
    case 'end':
      return fromClassName('content-end');
    case 'center':
      return fromClassName('content-center');
    case 'between':
      return fromClassName('content-between');
    case 'around':
      return fromClassName('content-around');
    default /* stretch */:
      return identity();
  }
};

type AlignSelf = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

const alignSelf = (value: AlignSelf): Style => {
  switch (value) {
    case 'start':
      return fromClassName('self-start');
    case 'end':
      return fromClassName('self-end');
    case 'center':
      return fromClassName('self-center');
    case 'between':
      return fromClassName('self-between');
    case 'around':
      return fromClassName('self-around');
    default /* auto */:
      return identity();
  }
};

type Wrap = boolean;

const wrap = (value: Wrap): Style => (
  value ? fromClassName('flex-wrap') : identity()
);

type Grow = boolean;

const grow = (value: Grow): Style => (
  value ? fromClassName('flex-auto') : identity()
);

type Shrink = boolean;

const shrink = (value: Shrink): Style => (
  value ? fromClassName('flex-none') : identity()
);

type Color = 'blue' | 'darkGray' | 'pine' | 'gray' | 'red' | 'slate' | 'lightGray' | 'white' | 'yellow' | 'transparent';

const color = (value: Color): Style => {
  switch (value) {
    case 'blue':
      return fromClassName('bg-blue');
    case 'darkGray':
      return fromClassName('bg-dark-gray');
    case 'pine':
      return fromClassName('bg-pine');
    case 'gray':
      return fromClassName('bg-gray');
    case 'red':
      return fromClassName('bg-red');
    case 'slate':
      return fromClassName('bg-slate');
    case 'lightGray':
      return fromClassName('bg-light-gray');
    case 'white':
      return fromClassName('bg-white');
    case 'yellow':
      return fromClassName('bg-yellow');
    default /* transparent */:
      return identity();
  }
};

type Overflow = 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto';

const overflow = (value: Overflow): Style => {
  switch (value) {
    case 'hidden':
      return fromClassName('overflow-hidden');
    case 'scroll':
      return fromClassName('overflow-scroll');
    case 'auto':
      return fromClassName('overflow-auto');
    case 'scrollX':
      return fromClassName(styles['overflow-scroll-x']);
    case 'scrollY':
      return fromClassName(styles['overflow-scroll-y']);
    default /* visible */:
      return identity();
  }
};

type Shape = 'square' | 'rounded' | 'pill' | 'circle' | 'roundedTop' | 'roundedBottom' | 'roundedLeft' | 'roundedRight';

const shape = (value: Shape): Style => {
  switch (value) {
    case 'rounded':
      return fromClassName('rounded');
    case 'pill':
      return fromClassName(styles.pill);
    case 'circle':
      return fromClassName('circle');
    case 'roundedTop':
      return fromClassName('rounded-top');
    case 'roundedBottom':
      return fromClassName('rounded-bottom');
    case 'roundedLeft':
      return fromClassName('rounded-left');
    case 'roundedRight':
      return fromClassName('rounded-right');
    default /* square */:
      return identity();
  }
};

type Fit = boolean;

const fit = (value: Fit): Style => (
  value ? fromClassName('fit') : identity()
);

// --

type PropType = {
  children?: any,
  dangerouslySetInlineStyle?: { __style: Object },

  xs?: ResponsiveProps,
  sm?: ResponsiveProps,
  md?: ResponsiveProps,
  lg?: ResponsiveProps,

  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  bottom?: Bottom,
  color?: Color,
  fit?: Fit,
  grow?: Grow,
  justifyContent?: JustifyContent,
  left?: Left,
  margin?: Margin,
  overflow?: Overflow,
  padding?: Padding,
  position?: Position,
  right?: Right,
  shape?: Shape,
  shrink?: Shrink,
  top?: Top,
  wrap?: Wrap,
};


const propToFn = {
  xs,
  sm,
  md,
  lg,
  alignContent,
  alignItems,
  alignSelf,
  bottom,
  color,
  fit,
  grow,
  justifyContent,
  left,
  margin,
  overflow,
  padding,
  position,
  right,
  shape,
  shrink,
  top,
  wrap,
};

const blacklistedProps = Object.keys(propToFn).concat([
  'onClick',
  'className',
  'style',
  'dangerouslySetInlineStyle',
]);

export default function Box(props: PropType) {
  // Flow complains if you use Object.keys and a more functional style here
  let cs = fromClassName(styles.box);
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in propToFn) {
    if (!Object.prototype.hasOwnProperty.call(props, prop)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const fn = propToFn[prop];
    const value = props[prop];
    cs = concat(cs, fn(value));
  }
  const className = cs.size > 0 ? { className: Array.from(cs).join(' ') } : {};

  const { dangerouslySetInlineStyle: dsis } = props;
  // This is disabled to match React's `dangerouslySetInnerHtml` style of
  // an object with like `{ __html: 'string' }`
  // eslint-disable-next-line no-underscore-dangle
  const style = (dsis && dsis.__style) ? { style: dsis.__style } : {};

  return (
    <div
      {...(omit(blacklistedProps, props))}
      {...className}
      {...style}
    >
      {props.children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node,
  dangerouslySetInlineStyle: PropTypes.shape({
    __style: PropTypes.object,
  }),

  xs: PropTypes.shape({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),

  sm: PropTypes.shape({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),

  md: PropTypes.shape({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),

  lg: PropTypes.shape({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),

  alignContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'between',
    'around',
    'stretch',
  ]),
  alignItems: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'baseline',
    'stretch',
  ]),
  alignSelf: PropTypes.oneOf([
    'auto',
    'start',
    'end',
    'center',
    'baseline',
    'stretch',
  ]),
  bottom: PropTypes.bool,
  color: PropTypes.oneOf([
    'blue',
    'darkGray',
    'pine',
    'gray',
    'red',
    'slate',
    'lightGray',
    'white',
    'yellow',
    'transparent',
  ]),
  fit: PropTypes.bool,
  grow: PropTypes.bool,
  justifyContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'between',
    'around',
  ]),
  left: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['auto']),
      ]),
      right: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(['auto']),
      ]),
    }),
  ]),
  overflow: PropTypes.oneOf([
    'visible',
    'hidden',
    'scroll',
    'scrollX',
    'scrollY',
    'auto',
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),
  position: PropTypes.oneOf([
    'static',
    'absolute',
    'relative',
    'fixed',
  ]),
  right: PropTypes.bool,
  shape: PropTypes.oneOf([
    'square',
    'rounded',
    'pill',
    'circle',
    'roundedTop',
    'roundedBottom',
    'roundedLeft',
    'roundedRight',
  ]),
  shrink: PropTypes.bool,
  top: PropTypes.bool,
  wrap: PropTypes.bool,
};
