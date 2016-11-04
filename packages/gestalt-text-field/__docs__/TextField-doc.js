// @flow

import React from 'react';
import { card, md } from 'corkboard';
import Text from '../../gestalt-text/Text';
import TextField from '../../gestalt-text-field/TextField';
import { ns } from '../../../.corkboard/cards';

ns('TextField');

card('PropTypes',
md`
\`\`\`jsx
TextField.propTypes = {
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']) /* default: text */
  value: PropTypes.string,
};
\`\`\`
`
);

card('Options',
md`Shown to the right are some of the various options that \`TextField\` supports.
They will expand to fill the width of their parent container and the text within
is responsive.

\`\`\`jsx
<TextFieldEx id="email" placeholder="Email Address" />
\`\`\`
\`\`\`jsx
<TextFieldEx hasError id="name" />
\`\`\`
\`\`\`jsx
<TextFieldEx id="password" type="password" value="abcdef" />
\`\`\`
`,
atom => (
  <div className="px2">
    <div className="py2">
      <Text>{'With a placeholder'}</Text>
      <TextField
        id="test"
        onChange={newValue => atom.reset({ placeholderValue: newValue })}
        placeholder="Email address"
        value={atom.deref().placeholderValue}
      />
    </div>
    <div className="py2">
      <Text>{'With errors'}</Text>
      <TextField
        hasError
        id="name"
        onChange={newValue => atom.reset({ errorValue: newValue })}
        value={atom.deref().errorValue}
      />
    </div>
  </div>
),
(atom) => {
  const state = atom.deref();
  return (
    <div className="px2">
      <div className="py2">
        <Text>{'With a password'}</Text>
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
