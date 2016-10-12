// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import IconButton from '../IconButton';
import { ns } from '../../../.corkboard/cards';

ns('IconButton', `
The IconButton component allows you to
define an action with an \`Icon\`.
\`\`\`js
IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
\`\`\`
`);

const iconButtonExamples = [
  'add',
  'arrow-back',
  'arrow-forward',
  'cancel',
  'cog',
  'edit',
  'ellipsis',
  'heart',
  'send',
  'share',
];

function IconButtonExample({ iconName }) {
  return (
    <div className="col-6 sm-col-3 px2 mb1 text-center border-box">
      <div className="mb1">
        <strong>{iconName}</strong>
      </div>
      <IconButton icon={iconName} label={iconName.replace(/-/g, ' ')} />
    </div>
  );
}

IconButtonExample.propTypes = {
  iconName: PropTypes.string.isRequired,
};

card('Icons',
md`
You can use any icon defined in the <a href="#/Icon">Icon component</a>.
\`\`\`html
<IconButton
  icon="pin"
  label="Pin"
/>
\`\`\`
`,
  <div className="flex mxn2 flex-wrap">
    {iconButtonExamples.map((icon, idx) =>
      <IconButtonExample iconName={icon} key={idx} />
    )}
  </div>);
