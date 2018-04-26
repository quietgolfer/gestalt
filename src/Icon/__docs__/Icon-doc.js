// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Icon from '../Icon';
import icons from '../icons/index';
import Text from '../../Text/Text';
import { ns } from '../../../.corkboard/cards';

ns('Icon');

card('FlowTypes',
md`
\`\`\`jsx
type IconProps = {
  accessibilityLabel: string,
  color?: 'white' | 'gray' | 'darkGray' | 'blue' | 'red', /* default: gray */
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons shown below.
   */
  icon?: $Keys<typeof paths>,
  inline?: boolean,
  size?: number, /* default: 16 */,
  dangerouslySetSvgPath?: { __path: string },
};
\`\`\`
`
);

const colorMap = {
  gray: 'gray (default)',
  darkGray: 'darkGray',
  white: 'white',
  blue: 'blue',
  red: 'red'
};

const colorItem = (color) => {
  if (color !== 'white') {
    return <Icon icon="pin" accessibilityLabel="Pin" color={color} />;
  }
  return (
    <Box xs={{ display: 'flexColumn' }} alignItems="center" color="darkGray" shape="circle" justifyContent="center" dangerouslySetInlineStyle={{ __style: { minWidth: 26, minHeight: 26 } }}>
      <Icon icon="pin" accessibilityLabel="Pin" color="white" />
    </Box>
  );
};

card('Colors',
  md`
\`\`\`html
<Icon icon="pin" accessibilityLabel="Pin" />
<Icon icon="pin" accessibilityLabel="Pin" color="darkGray" />
\`\`\`
`,
  <Box xs={{ display: 'flex' }}>
    {Object.keys(colorMap).map((color, idx) =>
      <Box xs={{ display: 'flexColumn', column: 2 }} padding={{ x: 2 }} alignItems="center" key={idx}>
        <Box padding={{ y: 3 }}>
          <Text align="center" bold color="darkGray">{colorMap[color]}</Text>
        </Box>
        {colorItem(color)}
      </Box>
    )}
  </Box>
);


card('Sizes',
  md`
Currently, icons can be any size desired. The default size is 16.
\`\`\`html
<Icon icon="pin" accessibilityLabel="Pin" size={16} />
<Icon icon="pin" accessibilityLabel="Pin" size={20} />
<Icon icon="pin" accessibilityLabel="Pin" size={24} />
<Icon icon="pin" accessibilityLabel="Pin" size={28} />
<Icon icon="pin" accessibilityLabel="Pin" size={32} />
\`\`\`
`,
  <Box xs={{ display: 'flex' }} wrap>
    {[16, 20, 24, 28, 32].map((size, idx) =>
      <Box xs={{ display: 'flexColumn', column: 2 }} padding={{ x: 2 }} alignItems="center" key={idx}>
        <Box padding={{ y: 3 }}>
          <Text align="center" bold color="darkGray">{size}</Text>
        </Box>
        <Icon icon="pin" accessibilityLabel="Pin" size={size} />
      </Box>
    )}
  </Box>
);

function IconType({ iconName }) {
  return (
    <Box xs={{ column: 6, display: 'flexColumn' }} sm={{ column: 3 }} alignItems="center">
      <Box padding={{ y: 3 }}>
        <Text align="center" bold color="darkGray">{iconName}</Text>
      </Box>
      <Icon icon={iconName} accessibilityLabel={iconName.replace(/-/g, ' ')} color="gray" />
    </Box>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

card('Types',
  md`
\`\`\`html
<Icon icon="pin" accessibilityLabel="Pin" />
<Icon icon="add-circle" accessibilityLabel="Add" />
<Icon icon="add-pin" accessibilityLabel="Add a Pin" />
<Icon icon="arrow-back" accessibilityLabel="Back" />
<Icon icon="arrow-circle-forward" accessibilityLabel="Forward" />
\`\`\`
`,
  <Box xs={{ display: 'flex' }} wrap>
    {Object.keys(icons).map((iconName, idx) =>
      <IconType iconName={iconName} key={idx} />
    )}
  </Box>);
