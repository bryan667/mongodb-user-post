import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

import SignUp from './signup_modal'
import '../../css/redirect.css'

class NoUser extends Component {
    state = {
        signUpModal: {
            show: false,          
        }
    }

    openModal = () => {
        const tempModal = this.state.signUpModal
        tempModal.show = true
        this.setState({
            signUpModal: tempModal
        })
    }

    closeModal = () => {
        const tempModal = this.state.signUpModal
        tempModal.show = false
        this.setState({
            signUpModal: tempModal
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
                            <p>New to the group? Sign up <Button onClick={()=> {this.openModal()}}>Here</Button></p>
                        </div>
                    </div>
                </div>
                <SignUp 
                    show={this.state.signUpModal.show}
                    closeModal={()=> this.closeModal()}  
                />
            </div>
        );
    }
};

export default NoUser