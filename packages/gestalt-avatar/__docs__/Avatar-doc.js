import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Avatar from '../Avatar';
import Text from '../../gestalt-text/Text';
import { ns } from '../../../.corkboard/cards';

ns('Avatar',
'You can use an `Avatar` to represent a user. Every Avatar image has a subtle color wash.');

card('PropTypes',
md`
\`\`\`jsx
Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  src: PropTypes.string,
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
  const { size, src } = props;
  return (
    <div className="p1">
      <Text bold align="center">{size}</Text>
      <Avatar
        name={name}
        size={size}
        src={src}
      />
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
size will scale to appropriately match the size of your screen.
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
If there is no image source provided to the \`Avatar\`, the first character of
the name provided will be used as a placeholder.
\`\`\`html
<Avatar
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
