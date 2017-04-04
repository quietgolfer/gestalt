// @flow
import React from 'react';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';
import Box from '../../Box/Box';
import Text from '../../Text/Text';
import Pog from '../Pog';

ns('Pog',
'A lower level functional component to show the active, hovered & focused states of an [IconButton](#/IconButton). We use this abstraction to allow for links that look like an IconButton.'
);

card('FlowTypes',
md`
\`\`\`jsx
type Props = {
  active?: boolean,
  bgColor?: 'transparent' | 'lightGray',
  focused?: boolean,
  hovered?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue',
  icon: $Keys<typeof icons>,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}
\`\`\`
`);

type ExampleProps = {
  active?: bool,
  focused?: bool,
  hovered?: bool,
  text: string,
};

const PogExample = (props:ExampleProps) => (
  <Box xs={{ display: 'flexColumn' }} alignItems="center" padding={2}>
    <Box margin={{ bottom: 2 }}>
      <Text bold>{props.text}</Text>
    </Box>
    <Pog
      active={props.active}
      focused={props.focused}
      hovered={props.hovered}
      icon="heart"
    />
  </Box>
);

card('Example',
md`

\`\`\`jsx
<Pog icon="heart" />
<Pog icon="heart" active />
<Pog icon="heart" hovered />
<Pog icon="heart" focused />
\`\`\`
`,
  <Box xs={{ display: 'flex' }}>
    <PogExample text="Regular" />
    <PogExample text="Active" active />
    <PogExample text="Hovered" hovered />
    <PogExample text="Focused" focused />
  </Box>
);
