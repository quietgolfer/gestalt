// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Spinner from '../Spinner';
import { ns } from '../../../.corkboard/cards';

ns('Spinner');

card('FlowType',
md`
\`\`\`javascript
type Props = {
  label: string,
  show: bool,
};
\`\`\`
`);

card('Spinner', md`
Spinners indicate when a user has to wait for something else to occur. They delay showing for 300ms to improve percieved performance.

The label on a spinner is for accessibility. You should pick labels that relate to the specific part of the product it's being used in ("Loading homefeed" for instance).
`, atom => (
  <div>
    <button
      onClick={() => {
        atom.reset({ show: !atom.deref().show });
      }}
    >
      {!atom.deref().show ? 'Show spinner' : 'Hide spinner'}
    </button>
    <Spinner show={atom.deref().show} label="Example spinner" />
    <p>Data</p>
  </div>
), { heading: false, initialState: { show: true } });
