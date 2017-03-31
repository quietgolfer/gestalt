// @flow
import React from 'react';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';
import Box from '../../Box/Box';
import GestaltProvider from '../../GestaltProvider/GestaltProvider';
import IconButton from '../IconButton';

ns('IconButton',
'The IconButton component allows you to define an action with a specific Icon.'
);

card('FlowTypes',
md`
\`\`\`jsx
type Props = {
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?: 'transparent' | 'lightGray', /* default: transparent */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue', /* default: gray */
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
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
const colors = ['transparent', 'lightGray'];

function IconButtonEx(props: *) {
  const { bgColor = 'lightGray', icon, size } = props;
  return (
    <IconButton
      accessibilityLabel={icon.replace(/-/g, ' ')}
      bgColor={bgColor}
      icon={icon}
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
  accessibilityLabel="cancel"
  bgColor="lightGray"
  icon="cancel"
  size="sm"
/>
\`\`\`
`,
  <GestaltProvider>
    <Box xs={{ display: 'flex' }} margin={{ left: -2, right: -2 }} wrap>
      {sizes.map((size, key) =>
        <Box xs={{ display: 'flexColumn' }} alignItems="center" padding={{ x: 3 }} key={key}>
          <h5>{size}</h5>
          <Box xs={{ display: 'flex' }} justifyContent="center">
            <IconButtonEx icon="heart" size={size} />
          </Box>
        </Box>
      )}
    </Box>
  </GestaltProvider>
);

card('Default Color Combinations',
md`
Here are examples of the default icon color combinations for an \`IconButton\`.
If no \`bgColor\` or \`iconColor\` prop is provided, the default
\`bgColor\` is \`transparent\` and \`iconColor\` is \`gray\`. For a provided \`bgColor\`
of \`lightGray\`, the default \`iconColor\` associated is \`gray\` if none is specified.
This occurs so that a button's \`iconColor\` will be set to coordinate correctly with the
\`bgColor\` you provided (as shown) without having to explicitly define it.

If you need an additional color beyond what we currently have available, please file an issue on Github!

\`\`\`html
<IconButton
  accessibilityLabel="add"
  icon="add"
/>
\`\`\`
\`\`\`html
<IconButton
  accessibilityLabel="cancel"
  bgColor="lightGray"
  icon="cancel"
/>
\`\`\`

`,
  <GestaltProvider>
    <Box margin={{ left: -2, right: -2 }} wrap xs={{ display: 'flex' }}>
      {icons.map((icon, i) =>
        <Box key={i} margin={{ bottom: 1 }} padding={{ x: 2 }} xs={{ display: 'flex', column: 12 }}>
          {colors.map((color, idx) =>
            <Box padding={{ x: 1 }} key={idx}>
              <IconButtonEx bgColor={color} icon={icon} size="md" />
            </Box>
          )}
        </Box>
    )}
    </Box>
  </GestaltProvider>
);

card('Other Color Options',
md`
If your design calls for modifications from the default color combinations shown above,
you can explicitly set the \`iconColor\`. This may be used in order to highlight it or
depict the \`IconButton\` as selected.

\`\`\`html
<IconButton
  accessibilityLabel="heart"
  iconColor="red"
  icon="heart"
/>
\`\`\`
\`\`\`html
<IconButton
  accessibilityLabel="pinterest"
  bgColor="lightGray"
  iconColor="red"
  icon="pinterest"
/>
\`\`\`
\`\`\`html
<IconButton
  accessibilityLabel="globe"
  iconColor="blue"
  icon="globe"
/>
\`\`\`
`,
  <GestaltProvider>
    <Box margin={{ left: -2, right: -2 }} wrap xs={{ display: 'flex' }}>
      <Box padding={{ x: 1 }}>
        <IconButton
          accessibilityLabel="heart"
          iconColor="red"
          icon="heart"
        />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton
          accessibilityLabel="pinterest"
          bgColor="lightGray"
          iconColor="red"
          icon="pinterest"
        />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton
          accessibilityLabel="globe"
          iconColor="blue"
          icon="globe"
        />
      </Box>
    </Box>
  </GestaltProvider>
);
