// @flow
import React, { PropTypes } from 'react';
import columns from '../Columns.css';
import { card, md } from 'corkboard';
import { ns, stylesTable } from '../../../.corkboard/cards';

ns('Columns');

function Column(props: {size: number, children?: any}) {
  const {
    size,
  } = props;

  const className = `col-${size}`;

  return (
    <div className={`border p1 border-box ${columns[className]}`}>
      {props.children ? props.children : `.col-${size}`}
    </div>
  );
}

Column.propTypes = {
  size: PropTypes.number,
};

card(
  'Column system',
  md`Gestalt supports a 12-column system with which you can build layouts by adding \`.col-{1-12}\`
  to your elements.

  \`\`\`html
  <div class="flex">
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
    <div class="col-1">.col-1</div>
  </div>
  <div class="flex">
    <div class="col-8">.col-8</div>
    <div class="col-8">.col-8</div>
  </div>
  <div class="flex">
    <div class="col-4">.col-4</div>
    <div class="col-4">.col-4</div>
    <div class="col-4">.col-4</div>
  </div>
  <div class="flex">
    <div class="col-6">.col-6</div>
    <div class="col-6">.col-6</div>
  </div>
  \`\`\`
  `,
  <div>
    <div className="flex mb2">
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
    </div>

    <div className="flex mb2">
      <Column size={8} />
      <Column size={4} />
    </div>

    <div className="flex mb2">
      <Column size={4} />
      <Column size={4} />
      <Column size={4} />
    </div>

    <div className="flex">
      <Column size={6} />
      <Column size={6} />
    </div>
  </div>);

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

stylesTable(require('!!raw!postcss!../Columns.css'));
