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

card('FlowTypes',
md`\`\`\`js
type ImageProps = {
  alt: string,
  children?: any,
  color: string,
  naturalHeight: number,
  naturalWidth: number,
  onError?: () => void,
  onLoad?: () => void,
  sizes?: string,
  src: string,
  srcSet?: {[key: string]: string},
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
  color="rgb(111, 91, 77)"
  naturalHeight={564}
  naturalWidth={564}
  src="..."
/>
\`\`\`
  `,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <Image
        alt="example.com"
        color="rgb(111, 91, 77)"
        naturalHeight={564}
        naturalWidth={564}
        src="https://s-media-cache-ak0.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
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
  naturalHeight={751}
  naturalWidth={564}
  src="..."
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
        alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
        color="rgb(231, 186, 176)"
        naturalHeight={751}
        naturalWidth={564}
        src="https://s-media-cache-ak0.pinimg.com/564x/19/f4/87/19f487a680f9fb1ecc8aa139b2afac7f.jpg"
      >
        <div className="white p2">
          Tropic greens: The taste of Petrol and Porcelain
        </div>
      </Image>
    </div>
  </div>
);
