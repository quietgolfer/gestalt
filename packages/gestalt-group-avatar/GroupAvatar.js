// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import FlexibleGrid from 'gestalt-flexible-grid';
import Image from 'gestalt-image';

import colorStyles from 'gestalt-colors/Colors.css';
import typographyStyles from 'gestalt-typography/Typography.css';
import layoutStyles from 'gestalt-layout/Layout.css';

const styles = {
  ...colorStyles,
  ...typographyStyles,
  ...layoutStyles,
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

/*
  Temporarily disable unused-props rule until the following issues are addressed:
  https://github.com/yannickcr/eslint-plugin-react/issues/819
  https://github.com/yannickcr/eslint-plugin-react/issues/861
*/
/* eslint-disable react/no-unused-prop-types */
type CollabProps = {
  initial?: string,
  name: string,
  src?: string,
};
/* eslint-enable react/no-unused-prop-types */

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
  numCollabs: number,
};

function DefaultAvatar(props: DefaultAvatarProps) {
  const { initial, name, height, fontSize, itemIdx, numCollabs } = props;
  const firstInitial = initial || name.charAt(0).toUpperCase();
  const marginLeft = itemIdx > 0 && numCollabs !== 2 ? '15%' : '0';
  const textAlign = itemIdx > 0 && numCollabs !== 2 ? 'none' : 'center';

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

const getQuarterAvatarStyles = (size: string) => {
  const dimensions = (AVATAR_SIZES[size] - GUTTER_WIDTH) / 2;

  return {
    height: dimensions,
    position: 'relative',
    overflow: 'hidden',
    width: dimensions,
  };
};

const getHalfAvatarStyles = (size: string) => {
  const dimensions = AVATAR_SIZES[size];
  const visibleWidth = (dimensions - GUTTER_WIDTH) / 2;
  const leftValue = (visibleWidth - dimensions) / 2;

  return {
    height: dimensions,
    left: leftValue,
    position: 'relative',
    width: dimensions,
  };
};

const getFullAvatarStyles = (size: string) => {
  const dimensions = AVATAR_SIZES[size];

  return {
    height: dimensions,
    position: 'relative',
    width: dimensions,
  };
};

export default class GroupAvatar extends Component {
  props: GroupAvatarProps;

  renderAvatarItem: (props: GridItemPropsType) => React.DOM.div = (props: GridItemPropsType) => {
    const { data, itemIdx } = props;
    const numCollabs = this.props.collaborators.length;
    const size = this.props.size;

    let avatarStyles;
    if (numCollabs === 1) {
      avatarStyles = getFullAvatarStyles(size);
    } else if (itemIdx === 0 || numCollabs === 2) {
      avatarStyles = getHalfAvatarStyles(size, itemIdx);
    } else {
      avatarStyles = getQuarterAvatarStyles(size);
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
      numCollabs={numCollabs}
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
            minItemWidth={collaborators.length === 1 ? MAX_AVATAR_DIM : HALF_AVATAR_DIM}
          />
        </div>
      </div>
  );
  }
}

/* eslint-disable react/no-unused-prop-types */
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
/* eslint-enable react/no-unused-prop-types */
