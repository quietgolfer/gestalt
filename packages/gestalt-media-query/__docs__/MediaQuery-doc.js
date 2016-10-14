// @flow
import React from 'react';
import { card, md } from 'corkboard';
import MediaQuery from '../MediaQuery';
import { ns } from '../../../.corkboard/cards';

ns(
  'MediaQuery',
`Gestalt is built in a responsive way.
The MediaQuery component allows you to render certain components on specific screensizes.
`
);

card('Usage',
  md`
\`\`\`js
<MediaQuery size="sm">
  <p>This text is shown on small screens and up</p>
</MediaQuery>
<MediaQuery size="md">
  <p>This text is shown on medium screens and up</p>
</MediaQuery>
<MediaQuery size="lg">
  <p>This text is shown on large screens and up</p>
</MediaQuery>
\`\`\`
  `,
  <div>
    <MediaQuery size="sm">
      <p>This text is shown on small screens and up</p>
    </MediaQuery>
    <MediaQuery size="md">
      <p>This text is shown on medium screens and up</p>
    </MediaQuery>
    <MediaQuery size="lg">
      <p>This text is shown on large screens and up</p>
    </MediaQuery>
  </div>
  );
