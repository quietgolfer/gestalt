// @flow
import React from 'react';
import { card, md } from 'corkboard';
import GroupAvatar from '../GroupAvatar';
import { ns } from '../../../.corkboard/cards';

ns('Group Avatar',
`You can use an \`GroupAvatar\` to represent a group of users. A light wash is automatically
applied to each collaborator image to ensure the component retains a circular appeareance`);

card('FlowTypes',
md`
\`\`\`jsx
type CollabProps = {
  name: string,
  src?: string,
};

type Props = {
  collaborators: Array<CollabProps>,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
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

const collabsWithPhotos = [ben, evan, tim, ben];
const collabsWithoutPhotos = collabsWithPhotos.map(collab => ({
  name: collab.name,
}));

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

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
these are not responsive. If a \`collaborator\` is missing an image, their
\`initial\` or first character of their \`name\` is used as a placeholder.`,
  <div>
    {sizes.map((size, key) =>
      <div className="flex px2" key={key}>
        <div className="p1 self-center">
          <div>{size}</div>
        </div>
        <GroupAvatarEx collabs={collabsWithPhotos} size={size} />
        <GroupAvatarEx collabs={collabsWithoutPhotos} size={size} />
      </div>
    )}
  </div>
);

card('Number of collaborators',
md`The layout automatically updates based on the number of collaborators.
If you have more than 3 collaborators, only the first 3 are shown and the
rest are discarded.`,
  <div>
    {[1, 2, 3].map((count, key) => (
      <div className="flex px2" key={key}>
        <div className="p1 self-center">
          <div>{count}</div>
        </div>
        <GroupAvatarEx
          collabs={collabsWithPhotos.slice(-count)}
          size={'md'}
        />
        <GroupAvatarEx
          collabs={collabsWithoutPhotos.slice(-count)}
          size={'md'}
        />
      </div>
    )
    )}
  </div>
);
