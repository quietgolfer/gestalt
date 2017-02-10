// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Button from '../../Button/Button';
import Divider from '../../Divider/Divider';
import ErrorFlyout from '../ErrorFlyout';
import Heading from '../../Heading/Heading';
import Text from '../../Text/Text';
import { ns } from '../../../.corkboard/cards';

ns('ErrorFlyout',
`[TextField](#TextField) and [TextArea](#TextArea) already have errors built into them. This component
is only for use with errors on other types of form fields.`
);

card('FlowType',
md`
\`\`\`jsx
type Props = {
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md', /* default sm */
  text: string,
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
          being, these sizes cover the 3 most common usecases for web.
        </Text>
      </div>
    </div>
  </div>
);

card('Ideal Direction Preference',
md`
The \`ErrorFlyout\` component gives you the ability to *influence* the preferred direction that it
opens. This may be a useful property to specify if you have a page with many potential Errors
and you want the behavior to look uniform.

If an \`idealDirection\` is provided, the ErrorFlyout will attempt to open in the direction specified.
It is important to note that the direction you specifiy can be over-ruled if there is not enough space
within the viewport in that specific direction and there is enough space in another direction. If no
\`idealDirection\` is provided, the ErrorFlyout will open in the direction where there is the
most space available within the viewport.

We encourage you to resize your browser now to observe the examples below to fully understand
this behavior!
`);

card('Example',
md`
\`\`\`jsx
<ErrorFlyout
  idealDirection="down"
  isOpen={this.state.isOpen}
  message="Oops! This item is out of stock."
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <Button
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      text="Remove"
    />
  }
  size="sm"
/>
\`\`\`
`,
atom => (
  <div className="flex">
    <div className="py2">
      <ErrorFlyout
        idealDirection="down"
        isOpen={atom.deref().open}
        message="Oops! This item is out of stock."
        onDismiss={() => atom.reset({ open: false })}
        size="sm"
        trigger={
          <Button
            onClick={() => atom.reset({ open: !atom.deref().open })}
            text="Remove"
          />
        }
      />
    </div>

  </div>
));
