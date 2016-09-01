// @flow
import React from 'react';
import layout from '../Layout.css';
import classnames from 'classnames/bind';

import { card, doc, ns } from 'corkboard';

const cx = classnames.bind(layout);

type LayoutProps = {
  flexClass: string,
  item?: boolean,
  itemText?: string,
  numItems?: number,
  style?: {[key: string] : string}
};

function FlexLayout(props : LayoutProps) {
  const {
    flexClass,
    item = false,
    itemText = '',
    numItems = 3,
    style = {},
  } = props;

  const numChildren = new Array(numItems).fill(' ');

  const classNames = [
    'flex',
    item ? null : flexClass,
  ];

  return (
    <div className="layout-container py2">
      <h3> <code> {`.${flexClass}`} </code> </h3>
      <div
        className={`${cx(classNames)} border`}
        style={{
          height: '100px',
          ...style,
        }}
      >
        {numChildren.map((_, idx) =>
          <FlexItem
            flexClass={item ? flexClass : ''}
            key={idx}
            text={itemText.length > 0 ? itemText : `item ${idx + 1}`}
          />
        )}
      </div>
    </div>
  );
}

type ItemProps = {
  flexClass?: string,
  text?: string
};

function FlexItem(props : ItemProps) {
  const {
    flexClass = null,
    text = 'flex-item',
  } = props;

  return (
    <div className={`${cx(flexClass)} pr1 bg-silver`}> {text} </div>
  );
}

ns('Layout');

card('Layout',
  doc`Most classes needed to layout elements correspond to their CSS properties/values pretty
  tightly. For example:

  \`.pull-left\` and \`.pull-right\` correspond to \`float: left\` and \`float: right\`.

  For a full list of classes and the properties they correspond to:

  | Class name        | Property: value                             |
  | ---               | ---                                         |
  | .block            | \`display: block\`                          |
  | .inline           | \`display: inline\`                         |
  | .inline-block     | \`display: inline-block \`                  |
  | .table            | \`display: table \`                         |
  | .table-cell       | \`display: table-cell \`                    |
  | .overflow-hidden  | \`overflow: hidden \`                       |
  | .overflow-scroll  | \`overflow: scroll \`                       |
  | .overflow-auto    | \`overflow: auto \`                         |
  | .fit              | \`max-width: 100% \`                        |
  | .relative         | \`position: relative \`                     |
  | .absolute         | \`position: absolute \`                     |
  | .fixed            | \`position: fixed \`                        |

  `);

card('Positioning',
  doc`Gestalt provides helper classes for resetting top, bottom, left, and right positioning.
  The respective classnames are: \`.top-0\`, \`.bottom-0\`, \`.left-0\`, \`.right-0\`
  `);

// TODO(allenk): Add flexbox properties, along with some code examples
card('Flexbox',
  doc`## Flexbox container classes

  In order to use flexbox, add the \`.flex\` class to a parent container element. If you're
  If you want all elements within the flex container to have the same alignment, then you could add
  the following classes to the parent container element.

  `,

  <div className="container">
    <FlexLayout flexClass={'flex-column'} />
    <FlexLayout flexClass={'flex-wrap'} style={{ width: '150px' }} numItems={5} />
    <FlexLayout flexClass={'items-start'} />
    <FlexLayout flexClass={'items-end'} />
    <FlexLayout flexClass={'items-center'} />
    <FlexLayout flexClass={'items-baseline'} />
    <FlexLayout flexClass={'items-stretch'} />
  </div>
  );

const itemClasses = [
  'self-start',
  'self-end',
  'self-center',
  'self-baseline',
  'self-stretch',
];

card('Flex box items',
  doc`If you want to align individual items inside of a flex container, you can use the following
  classes on items inside of a flex parent class
  `,

  <div className="container">
    {itemClasses.map((className, idx) =>
      <FlexLayout flexClass={className} item key={idx} />
    )}
  </div>
);

const justificationClasses = [
  'justify-start',
  'justify-end',
  'justify-between',
  'justify-around',
];

card('Flex item justification',
  doc`If you want to specify the horizonatal spacing for items within a flex container, or the
  horizontal justification for items within a flex container, you can apply the following classes
  to the **parent** container.
  `,

  <div className="container">
    {justificationClasses.map((className, idx) =>
      <FlexLayout flexClass={className} key={idx} />
    )}
  </div>
);

const contentClasses = [
  'content-start',
  'content-end',
  'content-center',
  'content-between',
  'content-around',
  'content-stretch',
];

card('Flex item justification',
  doc`If you want to specify the vertical spacing for items within a flex container, or the
  vertical justification for items within a flex container, you can apply the following classes
  to the **parent** container.
  `,
  <div className="container">
    {contentClasses.map((className, idx) =>
      <FlexLayout
        flexClass={className}
        key={idx}
        numItems={5}
        style={{
          flexFlow: 'row wrap',
          height: '250px',
          width: '200px',
        }}
      />
    )}
  </div>
);
