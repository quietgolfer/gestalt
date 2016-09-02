import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar';
import { card, md, ns } from 'corkboard';
import { dangerous } from '../../../.corkboard/dangerous';

ns('Avatar');
dangerous('Avatar');

class PreloadImageContext extends Component {
  static childContextTypes = {
    canPreloadImages: React.PropTypes.bool,
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
      canPreloadImages: this.props.canPreloadImages,
    };
  }

  render() {
    return this.props.children;
  }
}

card('Example',
  md`A simple avatar to visually represent a person.`,
  <PreloadImageContext canPreloadImages>
    <Avatar
      size={74}
      src="https://s-media-cache-ak0.pinimg.com/avatars/chrislloyd_1459403984_280.jpg"
      name="Chris Lloyd"
    />
  </PreloadImageContext>);
