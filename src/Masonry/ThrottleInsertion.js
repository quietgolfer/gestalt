// @flow
/* global ReactClass */
import React, { Component } from 'react';

// Time in ms of how long to throttle item grid insertion.
const INSERTION_THROTTLE_TIME = 25;

const ThrottleInsertion = (Subject: ReactClass<*>) => {
  type Props = any;

  return class extends Component {
    gridRef: Array<Subject>
    props: Props;

    constructor(props: Props) {
      super(props);
      this.state = {
        insertionsQueued: false,
        shownItems: props.items || [],
      };

      const proxyRefs = ['insertItems', 'reflow'];
      proxyRefs.forEach((func) => {
        const scope: Object = this;
        scope[func] = (...args) => {
          scope.gridRef[func](...args);
        };
      });
    }

    state: {
      insertionsQueued: bool,
      shownItems: Array<*>,
    };

    componentWillReceiveProps({ items }: Props) {
      if (items.length === this.props.items.length) {
        // Refresh shownItems if the count does not change.
        this.setState({
          shownItems: items
        });
      } else if (!this.state.insertionsQueued) {
        this.setState({
          insertionsQueued: true,
        });
        this.insertTimeout = setTimeout(this.insertOneItem);
      }
    }

    componentWillUnmount() {
      clearTimeout(this.insertTimeout);
    }

    /**
     * In order to limit DOM operations during page loading we throttle
     * insertions into the DOM for incrementally rendering items in the grid.
     */
    insertOneItem = () => {
      clearTimeout(this.insertTimeout);
      const shownItems = this.state.shownItems;
      if (shownItems.length >= this.props.items.length) {
        this.setState({
          insertionsQueued: false,
        });
        return;
      }
      const newItem = this.props.items[shownItems.length];
      const nextItems = shownItems.concat([newItem]);
      this.setState(
        {
          shownItems: nextItems,
        },
        () => {
          this.insertTimeout = setTimeout(this.insertOneItem, INSERTION_THROTTLE_TIME);
        },
      );
    }

    insertTimeout: ?number;

    render() {
      const props = {
        ...this.props,
        items: this.state.shownItems,
        insertionsQueued: this.state.insertionsQueued,
        ref: (ref) => { this.gridRef = ref; },
      };
      return <Subject {...props} />;
    }
  };
};


export default ThrottleInsertion;
