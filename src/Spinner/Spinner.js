// @flow
/* global $Exact */
/* global $Shape */
import React, { PropTypes, Component } from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import styles from './Spinner.css';

const DELAY = 300;
const SIZE = 40;

type Props = {|
  accessibilityLabel: string,
  show: bool,
|};

export default class Spinner extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
  }

  constructor(props: Props) {
    super(props);
    this.state = { visible: false };
  }

  state: { visible: bool };
  componentDidMount() {
    this.toggleVisibility();
  }

  componentDidUpdate() {
    // cleanup any timeouts that caused the state change
    clearTimeout(this.timeout);

    // toggle visibility if the desired state doesn't match props
    if (this.props.show !== this.state.visible) {
      this.toggleVisibility();
    }
  }

  componentWillUnmount() {
    // cleanup any pending timeouts if the component is unmounting
    clearTimeout(this.timeout);
  }

  props: Props;
  timeout: ?number;

  toggleVisibility() {
    const { show } = this.props;
    if (show) {
      this.timeout = setTimeout(() =>
        this.setState({ visible: true })
      , DELAY);
    } else {
      this.setState({ visible: false });
    }
  }

  render() {
    const { accessibilityLabel } = this.props;
    const { visible } = this.state;
    if (!visible) {
      return <div />;
    }

    return (
      <Box xs={{ display: 'flex' }} justifyContent="around" overflow="hidden">
        <div className={styles.icon}>
          <Icon icon="knoop" accessibilityLabel={accessibilityLabel} size={SIZE} />
        </div>
      </Box>
    );
  }
}
