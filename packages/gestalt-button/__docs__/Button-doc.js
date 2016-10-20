// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Button from '../Button';
import { ns } from '../../../.corkboard/cards';

ns('Button', `
In Gestalt we have 3 main kinds of buttons: red, gray, and blue. You are able
to specify the color, type, and width of buttons to change their apperance (outlined below).
\`\`\`js
Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'gray', 'red']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};
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
  <div>
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
  </div>);

card('Widths',
md`
There are two different width options for buttons. The variable width button widths are
determined by the width of the text within the button, whereas the full bleed button widths
expand to the full width of the container in which they are placed. Full bleed buttons also
contain slightly larger text and have more padding than their variable width counterparts.
The default \`fullWidth\` is false.
\`\`\`html
<Button
  text="Wide button with lots of text"
/>
\`\`\`
\`\`\`html
<Button
  text="Less wide button"
/>
\`\`\`
\`\`\`html
<Button
  fullWidth
  text="Full bleed width button"
/>
\`\`\`
`,
  <div>
    <div className="p2">
      <Button
        text="Wide button with lots of text"
      />
    </div>
    <div className="p2">
      <Button
        text="Less wide button"
      />
    </div>
    <div className="p2">
      <Button
        fullWidth
        text="Full bleed width button"
      />
    </div>
  </div>);

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
  <div>
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
  </div>);

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
  <div>
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
  </div>);
