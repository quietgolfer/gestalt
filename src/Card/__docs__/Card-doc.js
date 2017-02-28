// @flow
import React from 'react';

import Avatar from '../../Avatar/Avatar';
import Box from '../../Box/Box';
import Button from '../../Button/Button';
import Card from '../Card';
import Link from '../../Link/Link';
import Text from '../../Text/Text';

import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Card', `
The Card component allows for a special animation on hover. It visually shows that items belong together.
`);

card('FlowType',
md`
\`\`\`jsx
type Props = {
  ariaLabel: String,
  children?: any
}
\`\`\`
`);

card('Example',
md`
Using \`Card\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area.
\`\`\`html
<Card ariaLabel="Ben Silbermann - Pinterest CEO">
  <Box>
    <Link color="darkGray" href="https://pinterest.com">
      <Avatar
        name="Ben Silbermann" src="..."
      />
      <Box padding={{ x: 3, y: 2 }}>
        <Text size="xl" align="center" bold>
          {'Ben Silbermann'}
        </Text>
      </Box>
    </Link>
    <Button color="red" fullWidth text="Follow" />
  </Box>
</Card>
\`\`\`
`,
  <div>
    <Box xs={{ display: 'flex' }} wrap>
      <Box padding={2} dangerouslySetInlineStyle={{ __style: { maxWidth: 236 } }}>
        <Card ariaLabel="Ben Silbermann - Pinterest CEO">
          <Link color="darkGray" href="https://pinterest.com">
            <Avatar
              name="Ben Silbermann" src="http://static.logomaker.com.s3-us-west-2.amazonaws.com/wp-content/uploads/2014/10/Ben-Silberman.jpg"
            />
            <Box padding={{ x: 3, y: 2 }}>
              <Text size="xl" align="center" bold>
                {'Ben Silbermann'}
              </Text>
            </Box>
          </Link>
          <Button color="red" fullWidth text="Follow" />
        </Card>
      </Box>
      <Box padding={2} dangerouslySetInlineStyle={{ __style: { maxWidth: 236 } }}>
        <Card ariaLabel="Evan Sharp - Pinterest Co-Founder">
          <Link color="darkGray" href="https://pinterest.com">
            <Avatar
              name="Evan Sharp" src="https://pbs.twimg.com/profile_images/619669180481081344/9LMWv-Du.jpg"
            />
            <Box padding={{ x: 3, y: 2 }}>
              <Text size="xl" align="center" bold>
                {'Evan Sharp'}
              </Text>
            </Box>
          </Link>
          <Button color="red" fullWidth text="Follow" />
        </Card>
      </Box>
    </Box>
  </div>);