// @flow

import React from 'react';
import { card, md } from 'corkboard';
import TextArea from '../TextArea';
import { ns } from '../../../.corkboard/cards';

ns('TextArea');

card('FlowTypes',
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
  value?: string,
};
\`\`\`
`
);

card('Options',
md`A \`TextArea\` will expand to fill the width of their parent container and
the text within it is responsive.

\`\`\`jsx
<TextArea id="aboutme" placeholder="Write something about yourself..." />
\`\`\`
\`\`\`jsx
<TextArea
  errorMessage="This field can't be blank!"
  hasError
  id="comment"
/>
\`\`\`
`,
atom => (
  <div className="px2">
    <div className="py2">
      <label htmlFor="aboutme">With a placeholder</label>
      <TextArea
        id="aboutme"
        onChange={newValue => atom.reset({ placeholderValue: newValue })}
        placeholder="Write something about yourself..."
        value={atom.deref().placeholderValue}
      />
    </div>
  </div>
));

card('Errors',
md`TextArea's can display their own error messages if you'd like them to.
To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will
handle the rest.

\`\`\`jsx
<TextArea
  errorMessage="This field can't be blank!"
  id="comment"
/>
\`\`\`
`,
atom => (
  <div className="px2">
    <div className="py2">
      <label htmlFor="comment">With error message </label>
      <TextArea
        errorMessage="This field can't be blank!"
        id="comment"
        onChange={newValue => atom.reset({ errorMsgValue: newValue })}
        value={atom.deref().errorMsgValue}
      />
    </div>
  </div>
));
