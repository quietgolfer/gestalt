import React, { Component, PropTypes } from 'react';
import Image, { Placeholder } from '../Image';
import { card, doc, ns } from 'devcards';
import Mask from '../../Mask/Mask';
import Text from '../../Text/Text';
import Heading from '../../Heading/Heading';

ns('Image');

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

card('Image',
  doc`# Image

This component the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra super-powers to the regular Image tag to
make it even more awesome.

### Dimensions

One thing that might be unusual is that the width and the height of the
component are required, yet the image will scale to the size of its container.
This is so that the placeholder's size can be calculated before the image has
rendered.

While the exact dimensions supplied aren't used, (only the ratio between them is
considered) you should always try to try to supply the exact dimensions of the
source image requested.

### Shapes

You can compose images with [Masks](#/Mask) to produce different shapes like
rounded rectangles or circles.`,
  null, {}, { heading: false });

card('Preloading',
    doc`In environments where a DOM is available, \`Image\` has the ability to
pre-load its content and show a placeholder while it does so. Otherwise, it
renders a static \`<img/>\` tag.

To test this out, adjust network throttling in your developer tools.`,
  <div className="flex mxn2">
    <div className="col-4 px2">
      <h5>{'Static'}</h5>
      <PreloadImageContext>
        <Image
          alt="example.com"
          color="#CCC"
          height={750}
          placeholder="example.com"
          src="https://s-media-cache-ak0.pinimg.com/564x/5a/da/e7/5adae7e3e6cd31a86f9a6608618f3a30.jpg"
          width={500}
        />
      </PreloadImageContext>
    </div>
    <div className="col-4 px2">
      <h5>{'Preloaded'}</h5>
      <PreloadImageContext canPreloadImages>
        <Image
          alt="ynkim.com"
          color="#CCC"
          height={750}
          placeholder="example.com"
          src="https://s-media-cache-ak0.pinimg.com/564x/5a/da/e7/5adae7e3e6cd31a86f9a6608618f3a30.jpg"
          width={500}
        />
      </PreloadImageContext>
    </div>
  </div>);

card('Placeholders',
  doc`You can add optional content to the middle of a placeholder that shows up as an image loads.`,
  <div className="flex mxn2">
    <div className="col-4 px2">
      <Placeholder
        aspect={(314 / 216) * 100}
        color="#018077"
      >
        <Text size="s">{'example.com'}</Text>
      </Placeholder>
    </div>

    <div className="col-4 px2">
      <Mask height={60} type="circle" width={60}>
        <Placeholder
          aspect={100}
          color="#CCC"
        >
          <Heading color="white" size="xs">
            {'CL'}
          </Heading>
        </Placeholder>
      </Mask>
    </div>
  </div>);
