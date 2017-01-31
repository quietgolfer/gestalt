// @flow
import React from 'react';
import { card, md } from 'corkboard';
import IconButton from '../IconButton';
import { ns } from '../../../.corkboard/cards';

ns('IconButton',
'The IconButton component allows you to define an action with a specific Icon.'
);

card('FlowType',
md`
\`\`\`jsx
type Props = {
  aria?: { /* Accessibility */
    expanded?: boolean,
    haspopup?: boolean,
  },
  bgColor?: 'transparent' | 'light-gray', /* default: transparent */
  iconColor?: 'gray' | 'dark-gray' | 'red' | 'blue', /* default: gray */
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
  label: string,
  onClick?: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', /* default: md */
}
\`\`\`
`);

const icons = [
  'add',
  'cancel',
  'heart',
  'ellipsis',
  'pinterest',
  'person',
];

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const colors = ['transparent', 'light-gray'];

function IconButtonEx(props: *) {
  const { bgColor = 'light-gray', icon, size } = props;
  return (
    <IconButton
      bgColor={bgColor}
      icon={icon}
      label={icon.replace(/-/g, ' ')}
      size={size}
    />
  );
}

card('Sizes',
md`
There are 5 \`size\` options: \`xs: 24px, s: 32px, m: 40px,l: 48px, xl: 56px\`.

The default \`size\` is \`m\`.
These are subject to change as design recalibrates sizing. If you need a different
size beyond what we currently have available, please file an issue on Github!
\`\`\`html
<IconButton
  bgColor="light-gray"
  icon="cancel"
  label="cancel"
  size="sm"
/>
\`\`\`
`,
  <div className="flex mxn2 flex-wrap">
    {sizes.map((size, key) =>
      <div className="col-2 px2 text-center border-box" key={key}>
        <h5>{size}</h5>
        <IconButtonEx icon="heart" size={size} />
      </div>
    )}
  </div>
);

card('Default Color Combinations',
md`
Here are examples of the default icon color combinations for an \`IconButton\`.
If no \`bgColor\` or \`iconColor\` prop is provided, the default
\`bgColor\` is \`transparent\` and \`iconColor\` is \`gray\`. For a provided \`bgColor\`
of \`light-gray\`, the default \`iconColor\` associated is \`gray\` if none is specified.
This occurs so that a button's \`iconColor\` will be set to coordinate correctly with the
\`bgColor\` you provided (as shown) without having to explicitly define it.

If you need an additional color beyond what we currently have available, please file an issue on Github!

\`\`\`html
<IconButton
  icon="add"
  label="add"
/>
\`\`\`
\`\`\`html
<IconButton
  bgColor="light-gray"
  icon="cancel"
  label="cancel"
/>
\`\`\`

`,
  <div>
    <div className="flex mxn2 flex-wrap">
      {icons.map((icon, i) =>
        <div className="col-12 px2 mb1 border-box flex" key={i}>
          {colors.map((color, idx) =>
            <div className="px1" key={idx}>
              <IconButtonEx bgColor={color} icon={icon} size="md" />
            </div>
          )}
        </div>
    )}
    </div>
  </div>
);

card('Other Color Options',
md`
If your design calls for modifications from the default color combinations shown above,
you can explicitly set the \`iconColor\`. This may be used in order to highlight it or
depict the \`IconButton\` as selected.

\`\`\`html
<IconButton
  iconColor="red"
  icon="heart"
  label="heart"
/>
\`\`\`
\`\`\`html
<IconButton
  bgColor="light-gray"
  iconColor="red"
  icon="pinterest"
  label="pinterest"
/>
\`\`\`
\`\`\`html
<IconButton
  iconColor="blue"
  icon="globe"
  label="globe"
/>
\`\`\`
`,
  <div className="flex mxn2 flex-wrap">
    <div className="px1">
      <IconButton
        iconColor="red"
        icon="heart"
        label="heart"
      />
    </div>
    <div className="px1">
      <IconButton
        bgColor="light-gray"
        iconColor="red"
        icon="pinterest"
        label="pinterest"
      />
    </div>
    <div className="px1">
      <IconButton
        iconColor="blue"
        icon="globe"
        label="globe"
      />
    </div>
  </div>
);
