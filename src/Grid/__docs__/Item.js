import React from 'react';

export default class Item extends React.Component {
    render () {
        let pinStyles = {
            border: '1px solid #fff',
            width: '234px',
            background: this.props.data.color,
            height: `${this.props.data.height}px`
        };

        return (
            <div style={pinStyles}>
                {this.props.data.name}
            </div>
        );
    }
}

Item.propTypes = {
    data: React.PropTypes.object
};
