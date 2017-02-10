// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Divider from '../../Divider/Divider';
import Heading from '../../Heading/Heading';
import Tooltip from '../Tooltip';
import Text from '../../Text/Text';
import IconButton from '../../IconButton/IconButton';
import { ns } from '../../../.corkboard/cards';

ns('Tooltip');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md', /* default sm */
  trigger: React$Element<any>,
};
\`\`\`
`,
  <div>
    <div className="py2">
      <Heading size="xs">Sizes</Heading>
      <Divider />
      <Text><b>xs:</b> 185px</Text>
      <Text><b>sm:</b> 230px</Text>
      <Text><b>md:</b> 320px</Text>
      <div className="py2">
        <Text italic>
          Sizes are subject to change as we continue to gather input from design. For the time
          being, these sizes cover the 3 most common Tooltip usecases for web.
        </Text>
      </div>
    </div>
  </div>
);

card('Ideal Direction Preference',
md`
The \`Tooltip\` component gives you the ability to *influence* the preferred direction that it
opens. This may be a useful property to specify if you have a page with many potential Tooltips
and you want the behavior to look uniform.

If an \`idealDirection\` is provided, the Tooltip will attempt to open in the direction specified.
It is important to note that the direction you specifiy can be over-ruled if there is not enough space
within the viewport in that specific direction and there is enough space in another direction. If no
\`idealDirection\` is provided, the Tooltip will open in the direction where there is the
most space available within the viewport.

We encourage you to resize your browser now to observe the examples below to fully understand
this behavior!
`);

card('Example',
md`
Click on the IconButton to see the Tooltip display.
\`\`\`jsx
<Tooltip
  idealDirection="down"
  isOpen={this.state.isOpen}
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <IconButton
      label="Create a new board"
      icon="add"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
    />
  }
  size="sm"
>
  <Text bold color="white" size="md">Create a board to save Pins about Kitchen Design for later</Text>
</Tooltip>
\`\`\`
`,
atom => (
  <div className="flex">
    <div className="py2">
      <Tooltip
        idealDirection="down"
        isOpen={!!atom.deref().value}
        onDismiss={() => atom.reset({ value: !atom.deref().value })}
        trigger={
          <IconButton
            label="Create a new board"
            icon="add"
            onClick={() => atom.reset({ value: !atom.deref().value })}
          />
        }
        size="sm"
      >
        <Text bold color="white" size="md">Create a board to save Pins about Kitchen Design for later</Text>
      </Tooltip>
    </div>
  </div>
));
