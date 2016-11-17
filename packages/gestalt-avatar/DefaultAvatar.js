// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import Mask from 'gestalt-mask';
import styles from './Avatar.css';

const cx = classnames.bind(styles);


type DefaultAvatarProps = {
  name: string,
  size: ?'xs' | 'sm' | 'md' | 'lg' | 'xl',
};

export default class DefaultAvatar extends Component {
  state = {
    width: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  setComp = (c: HTMLElement) => {
    this.comp = c;
    this.updateDimensions();  // Needed to set the initial font sizes before resize event occurs
  }

  updateDimensions = () => {
    if (this.comp) {
      const width = this.comp.getBoundingClientRect().width;
      this.setState({ width });
    }
  }

  comp: HTMLElement;
  props: DefaultAvatarProps;

  render() {
    const { name, size } = this.props;
    // $FlowIssue: String spread.
    const firstInitial = [...name][0].toUpperCase();
    const container = cx(size);
    const fontSize = Math.round(this.state.width * 0.53);

    const blockStyles = !size && this.state.width ? {
      height: this.state.width,
    } : null;

    const defaultClasses = cx('defaultAvatar', size, { responsive: !size && !this.state.width });

    return (
      <div className={container} style={blockStyles}>
        <Mask shape="circle">
          <div
            aria-label={name}
            className={defaultClasses}
            style={{ ...blockStyles, fontSize }}
            ref={this.setComp}
          >
            <div className={styles.initial}>{firstInitial}</div>
          </div>
        </Mask>
      </div>
    );
  }
}

DefaultAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
