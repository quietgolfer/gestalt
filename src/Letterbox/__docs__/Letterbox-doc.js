// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Letterbox from '../Letterbox';
import { ns } from '../../../.corkboard/cards';

ns(
  'Letterbox',
  `
Letterboxes are useful if you have some source media which is larger than
the area you want to display it in. For instance, you might have a really
tall image and want it to be displayed in a neatly cropped square. While the
ideal solution to this problem is to update the source image, this mightn't
be always possible for either cost or performance reasons.

Letterbox should be used in situations where you would have otherwise used the
CSS property \`background-size: cover\`.`);

card('FlowType', md`
\`\`\`javascript
type Props = {
  children?: any,
  contentAspectRatio: number,
  height: number,
  width: number,
};
\`\`\`
`);

card('Example', md`
\`\`\`html
<Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
  <img
    alt="tall"
    style={{ width: '100%', display: 'block' }}
    src="https://s-media-cache-ak0.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg"
  />
</Letterbox>

<Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
  <img
    alt="wide"
    style={{ width: '100%', display: 'block' }}
    src="https://s-media-cache-ak0.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg"
  />
</Letterbox>

<Letterbox width={200} height={200} contentAspectRatio={200 / 200}>
  <img
    alt="square"
    style={{ width: '100%', display: 'block' }}
    src="https://s-media-cache-ak0.pinimg.com/564x/26/1b/2b/261b2b5b30706a2d59232dec0a4f86c3.jpg"
  />
</Letterbox>
\`\`\`
`,
  <div className="flex justify-around mxn2">
    <div className="px1">
      <h4>Tall content (564:806)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
        <img alt="tall" style={{ width: '100%', display: 'block' }} src="https://s-media-cache-ak0.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg" />
      </Letterbox>
    </div>

    <div className="px1">
      <h4>Wide content (564:517)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={564 / 517}>
        <img alt="wide" style={{ width: '100%', display: 'block' }} src="https://s-media-cache-ak0.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg" />
      </Letterbox>
    </div>

    <div className="px1">
      <h4>Square content (1:1)</h4>
      <Letterbox width={200} height={200} contentAspectRatio={1}>
        <img alt="square" style={{ width: '100%', display: 'block' }} src="https://s-media-cache-ak0.pinimg.com/564x/26/1b/2b/261b2b5b30706a2d59232dec0a4f86c3.jpg" />
      </Letterbox>
    </div>
  </div>,
{ stacked: true });
