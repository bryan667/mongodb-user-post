import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

import SignUp from './signup_modal'
import Success from './success_modal'
import '../../css/redirect.css'

class NoUser extends Component {
    state = {
        signUpModal: {
            show: false,          
        },
        successModal: {
            show: false,
        }
    }

    openModal = (modal) => {
        const tempModal = this.state[modal]
        tempModal.show = true
        this.setState({
            [modal]: tempModal
        })
    }

    closeModal = (modal) => {
        const tempModal = this.state[modal]
        tempModal.show = false
        this.setState({
            [modal]: tempModal
        })
    }
    
    render() {
        return (
            <div className='redirect_wrapper'>
                <div className='back_img'>
                    <div className='block'>
                        <div className='main_title'>
                            <p>Wall of</p>
                            <p>Pictures and Stuff</p>
                        </div>
                        <div className='desc'>
                            <p>Post pictures and stuff. Join the club! Please <Link to={`/sign_in`}>Sign in</Link>.</p> 
                            <p>New to the group? {'\u00A0'}
                                <Button bsStyle="primary" 
                                    onClick={()=> {this.openModal('signUpModal')}}
                                >Sign up here
                                </Button>                      
                            </p>
                        </div>
                    </div>
                </div>
                <SignUp 
                    show={this.state.signUpModal.show}
                    closeModal={()=> this.closeModal('signUpModal')} 
                    success={()=> this.openModal('successModal')} 
                />
                <Success 
                    show={this.state.successModal.show}
                    closeModal={()=> this.closeModal('successModal')}  
                />
            </div>
        );
    }
};

export default NoUser