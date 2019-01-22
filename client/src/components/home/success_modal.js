import React from 'react';
import {Link} from 'react-router-dom'
import {Modal, Button} from 'react-bootstrap'

const Success = ({show, closeModal}) => {
    return (
        <Modal show={show} onHide={()=> closeModal()}>
            <Modal.Header>
                Success!
            </Modal.Header>
            <Modal.Body>
                Profile registered successfully! Please <Link to='/sign_in'>sign in.</Link>
            </Modal.Body>
            <Modal.Footer>
                <Link to='/sign_in'>
                    <Button bsStyle="primary">Sign In</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default Success;