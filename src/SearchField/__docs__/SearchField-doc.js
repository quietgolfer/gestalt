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
  accessibilityLabel: string,
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
        <Icon icon="pinterest" color="red" size={20} accessibilityLabel="Pinterest" />
      </Box>
      <Box grow padding={{ x: 1 }}>
        <SearchField
          accessibilityLabel="Demo Search Field"
          id="searchField"
          onChange={({ value }) => atom.reset({ value })}
          onClear={() => atom.reset({ value: '' })}
          placeholder="Search and explore"
          value={atom.deref().value}
        />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton accessibilityLabel="Notifications" icon="speech-ellipsis" size="md" />
      </Box>
      <Box padding={{ x: 1 }}>
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Box>
    </Box>
  </div>
), { initialState: { value: '' } });
