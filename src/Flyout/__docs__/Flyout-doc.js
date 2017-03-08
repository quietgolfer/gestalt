// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Button from '../../Button/Button';
import Divider from '../../Divider/Divider';
import Heading from '../../Heading/Heading';
import Flyout from '../Flyout';
import IconButton from '../../IconButton/IconButton';
import Text from '../../Text/Text';
import { ns } from '../../../.corkboard/cards';

ns('Flyout');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  children?: any,
  closeLabel: string, // needed for accessibility  and internationalization
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen?: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', // default: sm
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
      <Text><b>lg:</b> 350px</Text>
      <Text><b>xl:</b> 496px</Text>
      <div className="py2">
        <Text italic>
          Sizes are subject to change as we continue to gather input from design. For the time
          being, these sizes cover the 5 most common flyout usecases for web.
        </Text>
      </div>
    </div>
  </div>
);

card('Ideal Direction Preference',
md`
The \`Flyout\` component gives you the ability to *influence* the preferred direction that it
opens. This may be a useful property to specify if you have a page with many potential flyouts
and you want the behavior to look uniform.

If an \`idealDirection\` is provided, the flyout will attempt to open in the direction specified.
It is important to note that the direction you specifiy can be over-ruled if there is not enough space
within the viewport in that specific direction and there is enough space in another direction.

If no \`idealDirection\` is provided, the flyout will open in the direction where there is the
most space available within the viewport. If there is not enough space in any direction, the flyout
will no longer be context-specific (with a caret to your trigger) and will appear at the bottom of
the screen. This is to ensure that users are always able to view the contents of the flyout,
regardless of their screen size.

We encourage you to resize your browser now to observe the examples below to fully understand
this behavior!
`);

card('isOpen & onDismiss',
md`
The parent element utilizing the Flyout component handles the open/closed state associated with it.
To manage this, you must provide that state in the \`isOpen\` prop of Flyout. You also must specify
an \`onDismiss\` callback that is called in the following scenarios when a user clicks on the page outside
of the Flyout and when a user presses the escape key.
`);

card('Accessibility',
md`
We recommend passing in the following ARIA attributes to the trigger element:

* \`aria.haspopup\` lets the screenreader know that there is a flyout linked to the tigger.
* \`aria.expanded\` informs the screenreader whether the flyout is currently open or closed.
`);

const moreFlyout = (
  <ul style={{ padding: 0, margin: 0, display: 'inline-block', listStyle: 'none' }}>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Access business tools</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">See order history</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Find friends</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Make a widget</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Get help</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Logout</a></Text>
    </li>
  </ul>
);

const profileFlyout = (
  <ul style={{ padding: 0, margin: 0, display: 'inline-block', listStyle: 'none' }}>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">View profile</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Get help</a></Text>
    </li>
    <li className="p2">
      <Text bold><a href="http://pinterest.com">Logout</a></Text>
    </li>
  </ul>
);

const plusFlyout = (
  <ul style={{ padding: 10, margin: 0, listStyle: 'none' }}>
    <li className="p2">
      <Text color="gray" bold>
        <a href="http://pinterest.com">Get our browser button to save ideas even faster</a>
      </Text>
    </li>
    <li className="p2">
      <Text color="gray" bold><a href="http://pinterest.com">Upload a pin</a></Text>
    </li>
    <li className="p2">
      <Text color="gray" bold><a href="http://pinterest.com">Save from a website</a></Text>
    </li>
    <li className="p2">
      <Text color="gray" bold><a href="http://pinterest.com">Report a bug</a></Text>
    </li>
  </ul>
);

const helpFlyout = (
  <div className="p2">
    <Text size="sm" bold align="center">
      Need help with something? Check out our Help Center.
    </Text>
    <div className="p2">
      <Button color="red" text="Visit the help center" />
    </div>
  </div>
);

card('Examples',
md`
Below are several sample code snippets with corresponding live Flyout examples on the right.

<b>#1</b>
\`\`\`jsx
<Flyout
  closeLabel="close"
  idealDirection="down"
  isOpen={this.state.isOpen}
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <IconButton
      aria-expanded={this.state.isOpen}
      aria-haspopup
      label="More options"
      icon="ellipsis"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
    />
  }
  size="xs"
>
  {children}
</Flyout>
\`\`\`
<b>#2</b>
\`\`\`jsx
<Flyout
  closeLabel="close"
  idealDirection="right"
  isOpen={this.state.isOpen}
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <IconButton
      aria-expanded={this.state.isOpen}
      aria-haspopup
      label="Profile options"
      icon="person"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
    />
  }
>
  {children}
</Flyout>
\`\`\`
<b>#3</b>
\`\`\`jsx
<Flyout
  closeLabel="close"
  isOpen={this.state.isOpen}
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <IconButton
      aria-expanded={this.state.isOpen}
      aria-haspopup
      label="Add pin"
      icon="plus"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
    />
  }
>
  {children}
</Flyout>
\`\`\`
<b>#4</b>
\`\`\`jsx
<Flyout
  closeLabel="close"
  idealDirection="up"
  isOpen={this.state.isOpen}
  onDismiss={() => this.setState({ isOpen: false })}
  trigger={
    <Button
      aria-expanded={this.state.isOpen}
      aria-haspopup
      text="Help"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
    />
  }
>
  {children}
</Flyout>
\`\`\`
`,
atom => (
  <div>
    <div className="py2">
      <span className="px1"><Text bold inline>#1</Text></span>
      <Flyout
        closeLabel="close"
        idealDirection="right"
        isOpen={!!atom.deref().more}
        onDismiss={() => atom.reset({ more: false })}
        trigger={
          <IconButton
            aria-expanded={!!atom.deref().more}
            aria-haspopup
            icon="ellipsis"
            label="More options"
            onClick={() => atom.reset({ more: !atom.deref().more })}
          />
        }
        size="xl"
      >
        {moreFlyout}
      </Flyout>
    </div>
    <div className="py2">
      <span className="px1"><Text bold inline>#2</Text></span>
      <Flyout
        closeLabel="close"
        idealDirection="right"
        isOpen={!!atom.deref().profile}
        onDismiss={() => atom.reset({ profile: false })}
        trigger={
          <IconButton
            aria-expanded={!!atom.deref().profile}
            aria-haspopup
            icon="person"
            label="Profile options"
            onClick={() => atom.reset({ profile: !atom.deref().profile })}
          />
        }
      >
        {profileFlyout}
      </Flyout>
    </div>
    <div className="py2">
      <span className="px1"><Text bold inline>#3</Text></span>
      <Flyout
        closeLabel="close"
        isOpen={!!atom.deref().add}
        onDismiss={() => atom.reset({ add: false })}
        trigger={
          <IconButton
            aria-expanded={!!atom.deref().add}
            aria-haspopup
            icon="add"
            label="Add pin"
            onClick={() => atom.reset({ add: !atom.deref().add })}
          />
        }
      >
        {plusFlyout}
      </Flyout>
    </div>
    <div className="py2">
      <span className="px1"><Text bold inline>#4</Text></span>
      <Flyout
        closeLabel="close"
        idealDirection="up"
        isOpen={!!atom.deref().help}
        onDismiss={() => atom.reset({ help: false })}
        trigger={
          <Button
            aria-expanded={!!atom.deref().help}
            aria-haspopup
            onClick={() => atom.reset({ help: !atom.deref().help })}
            text="Help"
          />
        }
      >
        {helpFlyout}
      </Flyout>
    </div>
  </div>
));
