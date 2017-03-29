// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Link from '../Link';
import { ns } from '../../../.corkboard/cards';
import GestaltProvider from '../../GestaltProvider/GestaltProvider';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';

ns('Link');

card('FlowType',
  md`
\`\`\`js
type LinkProps = {
  children: any,
  color: 'white' | 'darkGray' | 'gray' | 'red' | 'blue',
  href: string,
  inline?: boolean, /* default: false */
};
\`\`\`

### Example

\`\`\`jsx
<Link color="white" href="...">
  <Box padding={2}>Pinterest.com</Box>
</Link>
<Link color="gray" href="...">Pinterest.com</Link>
<Link color="darkGray" href="...">Pinterest.com</Link>
<Link color="red" href="...">Pinterest.com</Link>
<Link color="blue" href="...">Pinterest.com</Link>
\`\`\`

  `);

card(
  <GestaltProvider>
    <div className="bg-gray">
      <Text>
        <Link color="white" href="https://pinterest.com">
          <div className="p2">Pinterest.com</div>
        </Link>
      </Text>
    </div>
  </GestaltProvider>,
  { heading: false },
);
card(
  <GestaltProvider>
    <Text>
      <Link color="gray" href="https://pinterest.com">Pinterest.com</Link>
    </Text>
  </GestaltProvider>,
  { heading: false },
);
card(
  <GestaltProvider>
    <Text>
      <Link color="darkGray" href="https://pinterest.com">Pinterest.com</Link>
    </Text>
  </GestaltProvider>,
  { heading: false },
);
card(
  <GestaltProvider>
    <Text>
      <Link color="red" href="https://pinterest.com">Pinterest.com</Link>
    </Text>
  </GestaltProvider>,
  { heading: false },
);
card(
  <GestaltProvider>
    <Text>
      <Link color="blue" href="https://pinterest.com">
        <Icon icon="pin" color="blue" inline accessibilityLabel="pin" />
        Pinterest.com
      </Link>
    </Text>
  </GestaltProvider>,
  { heading: false },
);
