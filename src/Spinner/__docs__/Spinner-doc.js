// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Button from '../../Button/Button';
import Text from '../../Text/Text';
import Spinner from '../Spinner';
import { ns } from '../../../.corkboard/cards';

ns('Spinner');

card('FlowTypes',
md`
\`\`\`javascript
type Props = {
  accessibilityLabel: string,
  show: bool,
};
\`\`\`
`);

card('Spinner', md`
Spinners indicate when a user has to wait for something else to occur. They delay showing for 300ms to improve percieved performance.

The label on a spinner is for accessibility. You should pick labels that relate to the specific part of the product it's being used in ("Loading homefeed" for instance).
`, atom => (
  <Box>
    <Box padding={{ y: 1 }}>
      <Button
        inline
        text={!atom.deref().show ? 'Show spinner' : 'Hide spinner'}
        onClick={() => {
          atom.reset({ show: !atom.deref().show });
        }}
      />
    </Box>
    <Spinner show={!!atom.deref().show} accessibilityLabel="Example spinner" />
    <Text>Data</Text>
  </Box>
), { heading: false, initialState: { show: true } });
