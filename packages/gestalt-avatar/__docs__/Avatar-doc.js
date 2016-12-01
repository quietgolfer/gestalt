// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Avatar from '../Avatar';
import Column from '../../gestalt-column/Column';
import Text from '../../gestalt-text/Text';
import { ns } from '../../../.corkboard/cards';

ns('Avatar',
'You can use an `Avatar` to represent a user. Every Avatar image has a subtle color wash.');

card('FlowType',
md`
\`\`\`jsx
type AvatarProps = {
  name: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  src?: string,
}
\`\`\`
`
);

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

type AvatarExProps = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
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
size will scale to appropriately match the size of your screen. For certain designs you may
need a column-based or block sized Avatar. More information on that option is below.
\`\`\`html
<Avatar
  size="md"
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

card('Column-based Sizing',
md`
Avatars that are not given a \`size\` prop will be expand to fit to the width of their
parent container. These can be used if you need to achieve column-based sizing. Resize
the browser to see these Avatar change to match the width of the \`Column\` they
have been placed in.
\`\`\`html
<Column span={2}>
  <Avatar name="Julia" />
</Column>
<Column span={4}>
  <Avatar name="Long" src="path/to/image" />
</Column>
<Column span={6}>
  <Avatar name="Julia" />
</Column>
\`\`\`
`,
  <div className="flex">
    <Column span={2}>
      <Avatar name="Julia" src="" key={123} />
    </Column>
    <Column span={4}>
      <Avatar name="Long" src={imageSrc} key={123} />
    </Column>
    <Column span={6}>
      <Avatar name="Julia" src="" key={123} />
    </Column>
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
      <AvatarEx size={size} key={idx} src="" />
    )}
  </div>
  );
