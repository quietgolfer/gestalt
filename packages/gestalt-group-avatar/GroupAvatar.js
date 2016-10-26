// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import FlexibleGrid from 'gestalt-flexible-grid';

import colorStyles from 'gestalt-colors/Colors.css';
import typographyStyles from 'gestalt-typography/Typography.css';
import layoutStyles from 'gestalt-layout/Layout.css';
import imageStyles from 'gestalt-image/Image.css';

const styles = {
  ...colorStyles,
  ...typographyStyles,
  ...layoutStyles,
  ...imageStyles,
};

const cx = classnames.bind(styles);

const GUTTER_WIDTH = 2;

const AVATAR_SIZES = {
  xs: 36,
  s: 60,
  m: 108,
  l: 156,
  xl: 198,
};

const DEFAULT_AVATAR_TEXT_SIZES = {
  xs: 20,
  s: 32,
  m: 56,
  l: 90,
  xl: 106,
};

const PLACEMENT = {
  full: 'FULL',
  half: 'HALF',
  quarter: 'QUARTER',
};


type CollabProps = {
  initial?: string,
  name: string,
  src?: string,
  wash?: bool,
};

type ModifiedAvatarProps = CollabProps & {
  numCollabs: number,
  placement: 'FULL' | 'HALF' | 'QUARTER',
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
};

type GroupAvatarProps = {
  collaborators: Array<CollabProps>,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
};

type GridItemPropsType = {
  data: ModifiedAvatarProps,
};

type DefaultAvatarProps = {
  data: ModifiedAvatarProps,
  height: number,
};

function DefaultAvatar(props: DefaultAvatarProps) {
  const { data, height } = props;
  const fontSize = DEFAULT_AVATAR_TEXT_SIZES[data.size] / 2;
  const firstInitial = data.initial || data.name.charAt(0).toUpperCase();
  const additionalStyles = data.placement === 'QUARTER' ?
  {
    marginLeft: '15%',
    textAlign: 'none',
  } : {
    marginLeft: '0',
    textAlign: 'center',
  };

  const initialStyles = {
    ...additionalStyles,
    fontSize,
    lineHeight: `${height}px`,
  };

  const container = cx(
    'antialiased',
    'bg-gray',
    'bold',
    'overflow-hidden',
    'relative',
    'white'
  );

  const containerStyles = {
    height,
    width: data.placement === 'HALF' ? height / 2 : height,
  };

  return (
    <div aria-label={data.name} className={container} style={containerStyles}>
      <div style={initialStyles}>
        {firstInitial}
      </div>
    </div>
  );
}

const getAvatarStyles = (placement: string, size: string) => {
  /* adjusted dimensions for avatar's only displaying in a quarter of the circle */
  const dimensions = placement === 'QUARTER' ?
    (AVATAR_SIZES[size] - GUTTER_WIDTH) / 2 : AVATAR_SIZES[size];
  const visibleWidth = (dimensions - GUTTER_WIDTH) / 2;
  /* adjusted left offset for avatar's taking up half the circle to center image */
  const left = placement === 'HALF' ? (visibleWidth - dimensions) / 2 : 0;

  return {
    height: 'auto',
    left,
    position: 'relative',
    width: dimensions,
  };
};

/* Adds numCollabs and size to each piece of data in the grid
in order to have access to these attributes later on */
const addPositionDataToCollabs = (collaborators: Array<CollabProps>, size: string) => {
  const numCollabs = collaborators.length;
  return collaborators.map((collab, i) => {
    let placement;
    if (numCollabs === 1) {
      placement = PLACEMENT.full;
    } else if (i === 0 || numCollabs === 2) {
      placement = PLACEMENT.half;
    } else {
      placement = PLACEMENT.quarter;
    }
    return {
      ...collab,
      placement,
      size,
    };
  });
};

/* Avatar component to display data in grid */
function Avatar(props: GridItemPropsType) {
  const { data } = props;

  const avatarStyles = getAvatarStyles(data.placement, data.size);
  const washStyles = cx({ wash: data.wash });
  const backgroundColor = data.src ? 'bg-light-gray' : 'bg-gray';
  const imgContainerStyles = {
    height: avatarStyles.width,
  };
  const avatarSection = data.src ?
    <div>
      <div className={washStyles} />
      <img
        alt={data.name}
        height={1}
        src={data.src}
        style={avatarStyles}
        width={1}
      />
    </div>
  :
    <DefaultAvatar
      data={data}
      height={avatarStyles.width}
      placement={data.placement}
    />;

  const containerStyles = {
    height: avatarStyles.width + GUTTER_WIDTH,
    margin: GUTTER_WIDTH / 2,
    position: 'relative',
  };

  return (
    <div className={cx('overflow-hidden', 'relative')} style={containerStyles}>
      <div className={cx(backgroundColor, 'overflow-hidden')} style={imgContainerStyles}>
        {avatarSection}
      </div>
    </div>
  );
}

export default function GroupAvatar(props: GroupAvatarProps) {
  const { collaborators, size } = props;
  const collabs = addPositionDataToCollabs(collaborators, size).slice(0, 3);
  const MAX_AVATAR_DIM = AVATAR_SIZES[props.size];
  const HALF_AVATAR_DIM = (MAX_AVATAR_DIM - GUTTER_WIDTH) / 2;
  const borderBoxStyle = {
    border: '2px solid #ffffff',
    height: MAX_AVATAR_DIM,
    width: MAX_AVATAR_DIM,
  };

  return (
    <div
      className={cx('bg-white', 'circle', 'overflow-hidden')}
      style={borderBoxStyle}
    >
      <div style={{ margin: GUTTER_WIDTH / -2 }}>
        <FlexibleGrid
          comp={Avatar}
          items={collabs}
          maxItemWidth={MAX_AVATAR_DIM}
          minItemWidth={collabs.length === 1 ? MAX_AVATAR_DIM : HALF_AVATAR_DIM}
        />
      </div>
    </div>
);
}

/*
  Temporarily disable unused-props rule until the following issues are addressed:
  https://github.com/yannickcr/eslint-plugin-react/issues/819
  https://github.com/yannickcr/eslint-plugin-react/issues/861
*/
/* eslint-disable react/no-unused-prop-types */
GroupAvatar.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.shape({
    initial: PropTypes.string,
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
    wash: PropTypes.bool,
  })).isRequired,
  size: PropTypes.oneOf([
    'xs', 's', 'm', 'l', 'xl',
  ]).isRequired,
};
/* eslint-enable react/no-unused-prop-types */
