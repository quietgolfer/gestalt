// @flow

import React from 'react';
import { card, md } from 'corkboard';
import TextField from '../TextField';
import { ns } from '../../../.corkboard/cards';

ns('TextField');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  errorMessage?: string,
  id: string,
  name?: string,
  onBlur?: (value: string) => void,
  onChange: (value: string) => void,
  onFocus?: (value: string) => void,
  placeholder?: string,
  type?: 'email' | 'password' | 'text' | 'url', /* default: text */
  value?: string,
};
\`\`\`
`
);


card('Options',
md`Shown to the right are some of the various options that \`TextField\` supports.
They will expand to fill the width of their parent container and the text within
is responsive.

\`\`\`jsx
<TextField id="email" placeholder="Email Address" type="email" />
\`\`\`
\`\`\`jsx
<TextField id="password" type="password" value="abcdef" />
\`\`\`
`,
(atom) => {
  const state = atom.deref();
  return (
    <div className="px2">
      <div className="py2">
        <label htmlFor="email">With a placeholder</label>
        <TextField
          id="email"
          onChange={newValue => atom.reset({ placeholderValue: newValue })}
          placeholder="Email Address"
          value={atom.deref().placeholderValue}
          type="email"
        />
      </div>
      <div className="py2">
        <label htmlFor="password">With a password</label>
        <TextField
          id="password"
          type="password"
          value="abcdef"
          {...state}
          onChange={newValue => atom.set(props => ({
            ...props,
            value: newValue,
          }))}
        />
      </div>
    </div>
  );
});

card('Errors',
md`TextField's can display their own error messages if you'd like them to.
To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
handle the rest.

\`\`\`jsx
<TextField
  errorMessage="This field can't be blank!"
  id="firstName"
/>
\`\`\`
`,
atom => (
  <div className="px2">
    <div className="py2">
      <label htmlFor="firstName">With error message</label>
      <TextField
        errorMessage="This field can't be blank!"
        id="firstName"
        onChange={newValue => atom.reset({ firstName: newValue })}
        value={atom.deref().firstName}
      />
    </div>
  </div>
));

card('Error Validation',
md`We currently don't handle client side validation. If you are doing any custom validation,
we strongly recommend adding \`novalidate\` to your form component to ensure the browser does
not display the default input validation messages in addition to your custom ones.`
);
