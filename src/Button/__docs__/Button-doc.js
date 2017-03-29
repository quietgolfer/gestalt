// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Button from '../Button';
import GestaltProvider from '../../GestaltProvider/GestaltProvider';
import { ns } from '../../../.corkboard/cards';

ns('Button', `
In Gestalt we have 3 main kinds of buttons: red, gray, and blue. You are able
to specify the color, type, and width of buttons to change their apperance (outlined below).
`);

card('FlowType',
md`
\`\`\`jsx
type Props = {
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  color?: 'gray' | 'red' | 'blue', /* default: gray */
  disabled?: boolean, /* default: false */
  inline?: boolean, /* default: false */
  onClick?: () => void,
  text: string,
  type?: 'submit' | 'button', /* default: button */
}
\`\`\`
`);

card('Colors',
md`
There are 3 choices for button colors. The default color is \`gray\`.
\`\`\`html
<Button
  color="red"
  text="Save"
/>
\`\`\`
\`\`\`html
<Button
  text="Cancel"
/>
\`\`\`
\`\`\`html
<Button
  color="blue"
  text="Buy"
/>
\`\`\`
\
`,
  <GestaltProvider>
    <div className="p2">
      <Button
        color="red"
        text="Save"
      />
    </div>
    <div className="p2">
      <Button
        color="gray"
        text="Cancel"
      />
    </div>
    <div className="p2">
      <Button
        color="blue"
        text="Buy"
      />
    </div>
  </GestaltProvider>);

card('Widths',
md`
There are two different width options for buttons. The inline buttons are
are sized by the text within the button, whereas the default block buttons expand to the full width of their container. Inline buttons also
have slightly smaller text and have less padding. The default \`inline\` is false.

\`\`\`html
<Button
  text="Wide button with lots of text"
  inline
/>
\`\`\`
\`\`\`html
<Button
  text="Less wide button"
  inline
/>
\`\`\`
\`\`\`html
<Button
  text="Full bleed width button"
/>
\`\`\`
`,
  <GestaltProvider>
    <div className="p2">
      <Button
        text="Wide button with lots of text"
        inline
      />
    </div>
    <div className="p2">
      <Button
        text="Less wide button"
        inline
      />
    </div>
    <div className="p2">
      <Button
        text="Full bleed width button"
      />
    </div>
  </GestaltProvider>);

card('Types',
md`
There are 2 types of buttons: button and submit. Use the \`submit\` type when you do not
need to specify an \`onClick\` handler. The default type is \`button\`.
\`\`\`html
<Button
  onClick={() => null}
  text="Clear"
  type="button"
/>
\`\`\`
\`\`\`html
<Button
  color="red"
  text="Submit"
  type="submit"
/>
\`\`\`
`,
  <GestaltProvider>
    <div className="p2">
      <Button
        onClick={() => undefined}
        text="Clear"
        type="button"
      />
    </div>
    <div className="p2">
      <Button
        color="red"
        text="Submit"
        type="submit"
      />
    </div>
  </GestaltProvider>);

card('Disabled',
md`
We also offer support for disabled buttons. The default value for \`disabled\` is false.
\`\`\`html
<Button
  disabled
  text="Disabled"
/>
\`\`\`
\`\`\`html
<Button
  color="red"
  disabled
  text="Submit"
/>
\`\`\`
`,
  <GestaltProvider>
    <div className="p2">
      <Button
        disabled
        text="Disabled"
      />
    </div>
    <div className="p2">
      <Button
        color="red"
        disabled
        text="Submit"
      />
    </div>
  </GestaltProvider>);
