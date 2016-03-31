import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '../../components/Modal/Modal';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    openModal (e) {
        e.preventDefault();
        this.setState({
            openModal: true
        });
    }

    closeModal () {
        this.setState({
            openModal: false
        });
    }

    render () {
        let modal = null;
        if (this.state.openModal) {
            modal = (
                <Modal onHide={this.closeModal.bind(this)}>
                    <span>{'Hello, here is some modal content.'}</span>
                </Modal>
            );
        }

        return (
            <div>
                <a href='#' onClick={this.openModal.bind(this)}>{'Open Modal'}</a>
                {modal}
            </div>
        );
    }
};

ReactDOM.render(React.createElement(App), document.getElementById('app'));
