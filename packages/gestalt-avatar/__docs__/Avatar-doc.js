import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar';
import Text from '../../gestalt-text/Text';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Avatar',
'You can use an `Avatar` to represent a user.');

class PreloadImageContext extends Component {
  static childContextTypes = {
    preloadingSupported: React.PropTypes.bool,
  }

  static propTypes = {
    canPreloadImages: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    canPreloadImages: false,
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

card('PropTypes',
md`
\`\`\`jsx
Avatar.propTypes = {
  initial: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  src: PropTypes.string,
  wash: PropTypes.bool, /* adds dim overlay over Avatar to retain circular shape. default: false */
};
\`\`\`
`
);

const sizes = ['xs', 's', 'm', 'l', 'xl'];

type AvatarExProps = {
  size: sizes,
  src: string,
};

function AvatarEx(props: AvatarExProps) {
  const name = 'Long';
  const initial = 'L';
  const { size, src } = props;
  return (
    <div className="p1">
      <Text bold align="center">{size}</Text>
      <PreloadImageContext canPreloadImages>
        <Avatar
          initial={initial}
          name={name}
          size={size}
          src={src}
        />
      </PreloadImageContext>
    </div>
  );
}

AvatarEx.propTypes = {
  size: PropTypes.oneOf(sizes),
  src: PropTypes.string,
};

const imageSrc = 'https://s-media-cache-ak0.pinimg.com/avatars/long_1468294555_444.jpg';

card('Sizes',
  md`
There are 5 sizes you can choose for an \`Avatar\`. Avatar's are responsive so the image
size will scale to appropriately match the size of your screen
\`\`\`html
<Avatar
  size="m"
  src="path/to/image"
  name="Long"
/>
\`\`\`
  `,
  <div className="flex">
    {sizes.map((size, idx) =>
      <AvatarEx size={size} src={imageSrc} key={idx} />
    )}
  </div>
);

card('Without an image',
  md`
If there is no image source provided to the \`Avatar\`, the \`initial\` prop
will be used as a placeholder. We recommend using the \`initial\` prop in order
to better handle special characters. In absence of providing an \`initial\` prop,
the first character of the name will be used.
\`\`\`html
<Avatar
  initial="L"
  name="Long"
  size="xs"
/>
\`\`\`
  `,
  <div className="flex">
    {sizes.map((size, idx) =>
      <AvatarEx size={size} key={idx} />
    )}
  </div>);
