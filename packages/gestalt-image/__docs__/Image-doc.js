import React, { Component, PropTypes } from 'react';
import Image from '../Image';
import { card, md } from 'corkboard';
import Mask from '../../gestalt-mask/Mask';
import { ns } from '../../../.corkboard/cards';

ns('Image',
  `This component the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra super-powers to the regular Image tag to
make it even more awesome.

### PropTypes
\`\`\`js
Image.propTypes = {
  alt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
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

class PreloadImageContext extends Component {
  static childContextTypes = {
    preloadingSupported: React.PropTypes.bool,
  }

  static propTypes = {
    canPreloadImages: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  getChildContext() {
    return {
      preloadingSupported: this.props.canPreloadImages,
    };
  }

  render() {
    return this.props.children;
  }
}

card('Preloading',
    md`In environments where a DOM is available, \`Image\` has the ability to
pre-load its content and show a placeholder while it does so. Otherwise, it
renders a static \`<img/>\` tag.

To test this out, adjust network throttling in your developer tools.`,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <h5>{'Static'}</h5>
      <PreloadImageContext>
        <Image
          alt="example.com"
          color="#CCC"
          height={750}
          src="https://s-media-cache-ak0.pinimg.com/564x/5a/da/e7/5adae7e3e6cd31a86f9a6608618f3a30.jpg"
          width={500}
        />
      </PreloadImageContext>
    </div>
    <div className="col-6 px2">
      <h5>{'Preloaded'}</h5>
      <PreloadImageContext canPreloadImages>
        <Image
          alt="ynkim.com"
          color="#fbb6ac"
          height={750}
          src="https://s-media-cache-ak0.pinimg.com/564x/5a/da/e7/5adae7e3e6cd31a86f9a6608618f3a30.jpg"
          width={500}
        />
      </PreloadImageContext>
    </div>
  </div>);

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
  <Mask height={250} shape="circle" width={250}>
    <Image
      alt="placekitten.com"
      color="#CCC"
      height={250}
      src="http://placekitten.com/250/250"
      width={250}
    />
  </Mask>
  \`\`\`
  \`\`\`js
  <Mask height={354} shape="rounded" width={236}>
    <Image
      alt="placekitten.com"
      color="#fab904"
      height={250}
      src="http://placekitten.com/236/354"
      width={250}
    />
  </Mask>
  \`\`\`
  `,
  <div className="flex mxn2">
    <div className="col-6 px2">
      <Mask height={250} shape="circle" width={250}>
        <Image
          alt="placekitten.com"
          color="#fab904"
          height={250}
          src="http://placekitten.com/250/250"
          width={250}
        />
      </Mask>
    </div>
    <div className="col-6 px2">
      <Mask height={354} shape="rounded" width={236}>
        <Image
          alt="placekitten.com"
          color="#fab904"
          height={250}
          src="http://placekitten.com/236/354"
          width={250}
        />
      </Mask>
    </div>
  </div>
  );
