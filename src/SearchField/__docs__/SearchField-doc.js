// @flow

import React from 'react';
import { card, md } from 'corkboard';
import SearchField from '../SearchField';
import { ns } from '../../../.corkboard/cards';
import Box from '../../Box/Box';
import Icon from '../../Icon/Icon';
import IconButton from '../../IconButton/IconButton';

ns('SearchField');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  aria: { label: string },
  id: string,
  onChange: ({ value: string }) => void,
  onClear: () => void,
  placeholder?: string,
  value?: string,
};
\`\`\`
`);

card('Demo',
atom => (
  <div className="border">
    <Box padding={{ x: 1, y: 2 }} xs={{ display: 'flex' }} alignItems="center">
      <Box padding={2}>
        <Icon icon="pinterest" color="red" size={20} ariaLabel="Pinterest" />
      </Box>
      <Box grow padding={{ x: 1 }}>
        <SearchField
          aria={{ label: 'Demo Search Field' }}
          id="searchField"
          onChange={({ value }) => atom.reset({ value })}
          onClear={() => atom.reset({ value: '' })}
          placeholder="Search and explore"
          value={atom.deref().value}
        />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton icon="speech-ellipsis" size="md" label="Notifications" />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton icon="person" size="md" label="Profile" />
      </Box>
    </Box>
  </div>
), { initialState: { value: '' } });
