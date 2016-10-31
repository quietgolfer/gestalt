// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Image from '../Image';
import Mask from '../../gestalt-mask/Mask';
import { ns } from '../../../.corkboard/cards';

ns('Image',
  `
This component the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra super-powers to the regular Image tag to
make it even more awesome.

### PropTypes
\`\`\`js
Image.propTypes = {
  alt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  wash: PropTypes.bool, /* adds dim overlay over Avatar to retain circular shape. default: false */
};
\`\`\`

### Dimensions

One thing that might be unusual is that the \`width\` and the \`height\` of the
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

\`\`\`js
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

card('Shapes',
  md`
You can compose images with [Masks](#/Mask) to produce different shapes like
rounded rectangles or circles.
\`\`\`js
<Mask shape="circle">
  <Image
    alt="placekitten.com"
    color="#fab904"
    height={369}
    src="http://placekitten.com/400/400"
    width={369}
  />
</Mask>
\`\`\`
\`\`\`js
<Mask shape="rounded">
  <Image
    alt="placekitten.com"
    color="#fbb6ac"
    height={286}
    src="http://placekitten.com/200/286"
    width={200}
  />
</Mask>
\`\`\`
  `,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <h5>{'Circle'}</h5>
      <Mask shape="circle">
        <Image
          alt="placekitten.com"
          color="#fab904"
          height={369}
          src="http://placekitten.com/400/400"
          width={369}
        />
      </Mask>
    </div>
    <div className="col-6 px2">
      <h5>{'Rounded'}</h5>
      <Mask shape="rounded" >
        <Image
          alt="placekitten.com"
          color="#fbb6ac"
          height={286}
          src="http://placekitten.com/200/286"
          width={200}
        />
      </Mask>
    </div>
  </div>
  );

card('Washes',
    md`
  If you expect source images to have near-white dominant colors and are masking them in a shape, you can apply a wash to the image to darken it slightly. This has the effect of accentuating the borders of the mask.
  \`\`\`js
  <Mask shape="rounded">
    <Image
      alt="accompanyus.com"
      color="#ffffff"
      height={354}
      src="https://s-media-cache-ak0.pinimg.com/..."
      width={236}
      wash
    />
  </Mask>
  \`\`\`
    `,

  <div>
    <h5>{'Unwashed'}</h5>
    <Mask shape="rounded">
      <Image
        alt="accompanyus.com"
        color="#ffffff"
        height={354}
        src="https://s-media-cache-ak0.pinimg.com/474x/a6/18/e8/a618e806e57c0f0b811a128fe190f9fe.jpg"
        width={236}
      />
    </Mask>
  </div>
    ,
  <div>
    <h5>{'Washed'}</h5>
    <Mask shape="rounded">
      <Image
        alt="accompanyus.com"
        color="#ffffff"
        height={354}
        src="https://s-media-cache-ak0.pinimg.com/474x/a6/18/e8/a618e806e57c0f0b811a128fe190f9fe.jpg"
        width={236}
        wash
      />
    </Mask>
  </div>
    );
