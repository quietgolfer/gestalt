// @flow

import React from 'react';
import GroupAvatar from '../GroupAvatar';
import Text from '../../gestalt-text/Text';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Group Avatar',
'You can use an `GroupAvatar` to represent a group of users.');

card('PropTypes',
md`
\`\`\`jsx
GroupAvatar.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    initial: PropTypes.string,
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
  })).isRequired,
  size: PropTypes.oneOf([
    'xs', 's', 'm', 'l', 'xl',
  ]).isRequired,
};
\`\`\`
`);

const ben = {
  name: 'Ben S.',
  src: 'http://assets.bwbx.io/images/users/iqjWHBFdfxIU/iBzx2mf8iyl4/v1/-1x-1.jpg',
};

const tim = {
  name: 'Tim K.',
  src: 'https://a.fastcompany.net/multisite_files/fastcompany/imagecache/inline-small/inline/2014/04/3029375-inline-i-1-most-creative-people-2014-tim-kendall.jpg',
};

const evan = {
  name: 'Evan S.',
  src: 'http://cdn.archinect.net/images/1200x/q4/q4lvjve1b3pelocx.jpg',
};

const ben2 = {
  name: 'Ben S.',
};

const tim2 = {
  name: 'Tim K.',
};

const evan2 = {
  name: 'Evan S.',
};

const collabsWithPhotos = [ben, evan, tim];

const collabsWithoutPhotos = [ben2, evan2, tim2];

const sizes = ['xs', 's', 'm', 'l', 'xl'];

function GroupAvatarEx(props: *) {
  const { collabs, size } = props;
  return (
    <div className="px1">
      <GroupAvatar
        collaborators={collabs}
        size={size}
      />
    </div>
  );
}

card('Sizes',
md`There are 5 different sizes of Group Avatars. Unlike [Avatar](#/Avatar),
these are not responsive.If a \`collaborator\` is missing an image, their
\`initial\` or first character of their \`name\` is used as a placeholder.`,
  <div>
    {sizes.map((size, idx) =>
      <div className="flex px2">
        <div className="p1 self-center">
          <Text bold size="l">{size}</Text>
        </div>
        <GroupAvatarEx collabs={collabsWithPhotos} size={size} key={idx} />
        <GroupAvatarEx collabs={collabsWithoutPhotos} size={size} />
      </div>
    )}
  </div>
);
