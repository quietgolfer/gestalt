// @flow
import React, { PropTypes, Component } from 'react';
import Icon from '../Icon/Icon';
import styles from './Spinner.css';

const DELAY = 300;
const SIZE = 40;

type Props = {|
  label: string,
  loading: bool,
|};

export default class Spinner extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
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
    if (this.props.loading !== this.state.visible) {
      this.toggleVisibility();
    }
  }

  props: Props;
  timeout: ?number;

  toggleVisibility() {
    const { loading } = this.props;
    if (loading) {
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
      <div className={styles.Spinner}>
        <div className={styles.icon}>
          <Icon icon="knoop" label={label} size={SIZE} />
        </div>
      </div>
    );
  }
}
