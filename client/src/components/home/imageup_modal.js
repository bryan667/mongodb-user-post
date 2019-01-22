import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'

class ImageUp extends Component {

    state = {
        formError: false,
    }

    submitForm() {
    }

    closeModal = () => {
    }

    resetWarnings = () => {
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={()=> this.props.close()}>
                <Modal.Header>
                    Profile Pic
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=> this.props.close()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

export default ImageUp;