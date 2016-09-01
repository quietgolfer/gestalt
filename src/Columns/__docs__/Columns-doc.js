// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import columns from '../Columns.css';
import borders from '../../Borders/Borders.css';
import layout from '../../Layout/Layout.css';
import { card, md, ns } from 'corkboard';

ns('Columns');

const combinedStyles = Object.assign(columns, borders, layout);

const cx = classnames.bind(combinedStyles);

type RowProps = {children?: Object[]};

function Row(props: RowProps) {
  const classes = [
    'col',
    'col-12',
    'mb2',
  ];

  return (
    <div className={`${cx(classes)}`}>
      {props.children}
    </div>
  );
}

type ColumnProps = {size: number, children?: Object[]};

function Column(props: ColumnProps) {
  const {
    size,
  } = props;

  const classes = [
    'col',
    `col-${size}`,
    'border',
  ];

  return (
    <div className={`${cx(classes)}`}>
      {props.children ? props.children : `.col-${size}`}
    </div>
  );
}

Column.propTypes = {
  size: PropTypes.number,
};

card('Columns',
  md`## Columns

  Gestalt supports a 12-column system with which you can build layouts by adding \`.col-{1-12}\`
  to your elements.

  \`\`\`html
  <div class="col-12">
    <div class="col-10"> .col-10 </div>
    <div class="col-2"> .col-2 </div>
  </div>

  <div class="col-12">
    <div class="col-3"> .col-3 </div>
    <div class="col-3"> .col-3 </div>
    <div class="col-3"> .col-3 </div>
    <div class="col-3"> .col-3 </div>
  </div>
  \`\`\`
  `,
  <Row>
    <Row>
      <Column size={10} />
      <Column size={2} />
    </Row>

    <Row>
      <Column size={3} />
      <Column size={3} />
      <Column size={3} />
      <Column size={3} />
    </Row>
  </Row>,
  {},
  { heading: false });

card('Breakpoints',
  md`There are breakpoints for small, medium, and large screens. Use the \`sm\`, \`md\`,
  and \`lg\` prefixes to achieve a responsive grid on various screen sizes.

  \`\`\`html
  <div class="md-col-12">
    <div class="md-col-6"> .md-col-6 </div>
    <div class="md-col-6"> .md-col-6 </div>
  </div>

  <div class="sm-col-12">
    <div class="sm-col-4"> .sm-col-4 </div>
    <div class="sm-col-4"> .sm-col-4 </div>
    <div class="sm-col-4"> .sm-col-4 </div>
  </div>

  <div class="lg-col-12">
    <div class="lg-col-7"> .lg-col-7 </div>
    <div class="lg-col-5"> .lg-col-5 </div>
  </div>
  \`\`\`
  `,
  <div />
);
