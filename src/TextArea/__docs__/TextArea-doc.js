// @flow

import React from 'react';
import { card, md } from 'corkboard';
import TextArea from '../TextArea';
import { ns } from '../../../.corkboard/cards';

ns('TextArea');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  hasError?: boolean,
  id: string,
  name?: string,
  onChange: (value: string) => void,
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
<TextArea hasError id="comment" />
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
    <div className="py2">
      <label htmlFor="comment">With errors</label>
      <TextArea
        hasError={!atom.deref().errorValue}
        id="comment"
        onChange={newValue => atom.reset({ errorValue: newValue })}
        value={atom.deref().errorValue}
      />
    </div>
  </div>
));
