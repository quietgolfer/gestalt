import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class WithLayout extends Component {
    constructor (props, context) {
        super(props, context);
        this.measuringNode = document.createElement('div');
        this.state = {
            cache: null
        };
    }

    componentDidMount () {
        this.renderToCache();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.invalidateCacheKey !== nextProps.invalidateCacheKey) {
            this.setState({
                cache: null
            });
            setTimeout(() => {
                this.renderToCache();
            });
        }
    }

    renderToCache () {
        // If we don't have the item in cache yet, render it.
        if (!this.state.cache) {
            // Append a temporary node to the dom to measure it.
            document.body.appendChild(this.measuringNode);
            var child = this.props.children();
            let rendered = ReactDOM.render(child, this.measuringNode);
            let {clientWidth, clientHeight} = rendered;
            document.body.removeChild(this.measuringNode);

            // Trigger the prop fn to determine layout using layout information.
            let processedLayoutInfo = this.props.processInfo(this.props.data, clientWidth, clientHeight);
            this.setState({
                cache: this.props.children(processedLayoutInfo)
            });
        }
    }

    render () {
        if (this.state.cache) {
            return this.state.cache;
        }

        // Return nothing until we're ready to render.
        return null;
    }
}

WithLayout.propTypes = {
    /**
     * A function to render the child with layout information.
     */
    children: React.PropTypes.func,

    /**
     * Item renderer data.
     */
    data: React.PropTypes.object,

    /**
     * Change this value to invalidate render cache.
     */
    invalidateCacheKey: React.PropTypes.any,

    /**
     * Processes rendered layout information.
     */
    processInfo: React.PropTypes.func,
};
