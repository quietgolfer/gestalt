// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Image from '../Image';
import { ns } from '../../../.corkboard/cards';

ns('Image',
  `
This component the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra super-powers to the regular Image tag to
make it even more awesome.
`);

card('FlowType',
md`\`\`\`js
type ImageProps = {
  alt: string,
  color: string,
  height: number,
  onError?: () => void,
  onLoad?: () => void,
  sizes?: string,
  src: string,
  srcSet?: {[key: string]: string},
  width: number, /* default: false */
};
\`\`\`
`);

card('Dimensions',
md`One thing that might be unusual is that the \`width\` and the \`height\` of the
component are required, yet the image will scale to the size of its container.
This is so that the placeholder's size can be calculated before the image has
rendered.

While the exact dimensions supplied aren't used, (only the ratio between them is
considered) you should always try to try to supply the exact dimensions of the
source image requested.`);

card('Placeholders',
  md`
The color you pass into \`Image\` will be used to fill the placeholder that shows up
as an image loads. The example shown has an empty \`src\` prop provided so it remains
a placeholder.

\`\`\`jsx
<Image
  alt="example.com"
  color="#018077"
  height={354}
  src=""
  width={236}
/>
\`\`\`
  `,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <Image
        alt="example.com"
        color="#018077"
        height={354}
        src=""
        width={236}
      />
    </div>
  </div>);

card('Overlay',
md`
You can overlay content on an Image by passing it children.

\`\`\`jsx
<Image
  alt="..."
  color="#000"
  height={760}
  src="..."
  width={564}
>
  <div className="white p2">
    M.C. Escher  Phosphorescent Sea (1933)
  </div>
</Image>
\`\`\`

`,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <Image
        alt="M.C. Escher  Phosphorescent Sea (1933)"
        color="#000"
        height={760}
        src="https://s-media-cache-ak0.pinimg.com/564x/f6/30/6a/f6306abfb1e548f54682f1326da9fb14.jpg"
        width={564}
      >
        <div className="white p2">
          M.C. Escher  Phosphorescent Sea (1933)
        </div>
      </Image>
    </div>
  </div>
);
