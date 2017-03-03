// @flow
import React, { PropTypes, Component } from 'react';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import styles from './Spinner.css';

const DELAY = 300;
const SIZE = 40;

type Props = {
  label: string,
  show: bool,
};

export default class Spinner extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
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
    // cleanup any timeouts that cause dthe state change
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // toggle visibility if the desired state doesn't match props
    if (this.props.show !== this.state.visible) {
      this.toggleVisibility();
    }
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
    const { label } = this.props;
    const { visible } = this.state;
    if (!visible) {
      return <div />;
    }

    return (
      <Box xs={{ display: 'flex' }} justifyContent="around" overflow="hidden">
        <div className={styles.icon}>
          <Icon icon="knoop" ariaLabel={label} size={SIZE} />
        </div>
      </Box>
    );
  }
}
