import React, { Component } from 'react';
import style from './Modal.css';

export default class Modal extends Component {

    constructor (props, context) {
        super(props, context);
    }

    componentDidMount () {
        /**
         * Listener when the user clicks on the dialog.
         * If we can bubble the click event to the wrapper, we hide the modal.
         */
        this.boundListener = e => {
            let target = e.target;
            while (target && target !== document.body) {
                if (target === this.content) {
                    break;
                } else if (target === this.wrapper) {
                    this.props.onHide();
                }
                target = target.parentNode;
            }
        };
        this.wrapper.addEventListener('click', this.boundListener);
    }

    componentWillUnmount () {
        this.wrapper.removeEventListener('click', this.boundListener);
    }

    render () {
        const { children } = this.props;
        return (
            <div>
                <div className={style.mask}></div>
                <div className={style.wrapper}  ref={ref => this.wrapper = ref}>
                    <div className={style.content} ref={ref => this.content = ref}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    children: React.PropTypes.any,
    onHide: React.PropTypes.func
};
