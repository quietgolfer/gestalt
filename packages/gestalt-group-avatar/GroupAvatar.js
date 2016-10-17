// @flow
import React, { Component, PropTypes } from 'react';
import Avatar from '../gestalt-avatar';
import classnames from 'classnames/bind';
import FlexibleGrid from '../gestalt-flexible-grid';
import Image from '../gestalt-image';

import styles from '../pinterest-gestalt/styles.css';
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

type CollabProps = {
  initial?: string,
  name: string,
  src?: string,
};

type GridItemPropsType = {
  data: CollabProps,
  itemIdx: number, /* idx of the data item in the grid */
};

type GroupAvatarProps = {
  collaborators: Array<CollabProps>,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
};

type DefaultAvatarProps = {
  initial?: string,
  name: string,
  height: number,
  fontSize: number,
  itemIdx: number,
};

function DefaultAvatar(props: DefaultAvatarProps) {
  const { initial, name, height, fontSize, itemIdx } = props;
  const firstInitial = initial || name.charAt(0).toUpperCase();
  const marginLeft = itemIdx > 0 ? '15%' : '0';
  const textAlign = itemIdx > 0 ? 'none' : 'center';

  const initialClasses = cx(
    'antialiased',
    'bold',
    'white',
  );

  const initialStyles = {
    fontSize,
    lineHeight: `${height}px`,
    marginLeft,
    textAlign,
  };

  const container = cx(
    'bg-gray',
    'overflow-hidden',
    'relative'
  );

  return (
    <div aria-label={name} className={container} style={{ height }}>
      <div className={initialClasses} style={initialStyles}>
        {firstInitial}
      </div>
    </div>
  );
}

function getQuarterAvatarStyles(size: string) {
  const dimensions = (AVATAR_SIZES[size] - GUTTER_WIDTH) / 2;

  return {
    height: dimensions,
    position: 'relative',
    overflow: 'hidden',
    width: dimensions,
  };
}

function getHalfAvatarStyles(size: string) {
  const dimensions = AVATAR_SIZES[size];
  const visibleWidth = (dimensions - GUTTER_WIDTH) / 2;
  const leftValue = (visibleWidth - dimensions) / 2;

  return {
    height: dimensions,
    left: leftValue,
    position: 'relative',
    width: dimensions,
  };
}

export default class GroupAvatar extends Component {
  props: GroupAvatarProps;

  renderAvatarItem: (props: GridItemPropsType) => React.DOM.div = (props: GridItemPropsType) => {
    const { data, itemIdx } = props;
    const numCollabs = this.props.collaborators.length;
    const size = this.props.size;

    let avatarStyles;
    if (itemIdx === 0 || numCollabs === 2) {
      avatarStyles = getHalfAvatarStyles(size);
    } else {
      avatarStyles = getQuarterAvatarStyles(size, itemIdx);
    }
    const fontSize = DEFAULT_AVATAR_TEXT_SIZES[size] / 2;
    const containerStyles = {
      height: avatarStyles.height + GUTTER_WIDTH,
      margin: GUTTER_WIDTH / 2,
    };

    const avatarSection = data.src ?
      <Image
        alt={data.name}
        color="#efefef"
        height={1}
        src={data.src}
        wash
        width={1}
      />
    : <DefaultAvatar
      initial={data.initial}
      name={data.name}
      height={avatarStyles.height}
      fontSize={fontSize}
      itemIdx={itemIdx}
    />;

    return (
      <div className={cx('overflow-hidden', 'relative')} style={containerStyles}>
        <div style={avatarStyles}>
          {avatarSection}
        </div>
      </div>
    );
  }


  render() {
    const {
      collaborators,
      size = 'm',
    } = this.props;
    const numCollabs = collaborators.length;

    if (numCollabs === 1) {
      const data = collaborators[0];
      return (
        <Avatar
          initial={data.initial}
          name={data.name}
          size={size}
          src={data.src}
          wash
        />
      );
    }

    const MAX_AVATAR_DIM = AVATAR_SIZES[size];
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
            comp={this.renderAvatarItem}
            items={collaborators}
            maxItemWidth={MAX_AVATAR_DIM}
            minItemWidth={HALF_AVATAR_DIM}
          />
        </div>
      </div>
  );
  }
}

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
