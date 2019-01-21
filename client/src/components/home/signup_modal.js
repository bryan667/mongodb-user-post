import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import axios from 'axios'

import FormField from '../ui/formFields'
import {validateFunction} from '../ui/misc'

class SignUp extends Component {

    state = {
        formError: false,        
        disabled: false,
        responseError:'',
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'Enter your email here'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            firstname: {
                element: 'input',
                value: '',
                config: {
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Enter firstname'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter lastname'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            },
        },
    }

    updateForm(event) {
        const tempValue = event.event.target.value
        const tempID = event.id

        const tempFormData = this.state.formData
        const tempElement = tempFormData[tempID]

        tempElement.value = tempValue

        //validation check
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]
        tempFormData[tempID] = tempElement

        this.setState({
            formData: tempFormData,
            formError: false
        })
    }

    submitForm() {
        let dataToSubmit = {}
        let formIsValid = true

        for (let items in this.state.formData) {            
            dataToSubmit[items] = this.state.formData[items].value
            formIsValid = this.state.formData[items].valid            
        }

        console.log('data:', dataToSubmit)

        if (formIsValid) {
            this.setState({
                disabled: true
            })

            axios.post(`api/users/register`, dataToSubmit)
            .then(res => {
                console.log('user created: ', res.data)
                if(res.data.success){
                    alert('registered!')
                    this.setState({
                        formError: false,
                        disabled: false,
                        responseError: ''
                    })
                } else if (res.data.err.code === 11000) {
                    this.setState({
                        formError: false,
                        disabled: false,
                        responseError: 'someone is already registered on the same email'
                    })
                } else if (res.data.err.code) {
                    this.setState({
                        formError: false,
                        disabled: false,
                        responseError: res.data.err.errmsg
                    })
                } else {
                    this.setState({
                        formError: false,
                        disabled: false,
                        responseError: 'Error please try again later'
                    })
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        const {disabled, responseError, formError} = this.state
        return (
            <Modal show={this.props.show} onHide={()=> this.props.closeModal()}>
                <Modal.Header>
                    Sign Up
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormField
                                id={'firstname'}
                                formData={this.state.formData.firstname}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        <FormField
                                id={'password'}
                                formData={this.state.formData.password}
                                change={(event) => this.updateForm(event)}
                        ></FormField>
                        {formError ?
                        <div className='error_label'>
                            {'Please check all required fields'}
                        </div>
                        :null
                        }
                        <div className='error_label'>
                            {responseError}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=> this.props.closeModal()}>Cancel</Button>
                    <Button bsStyle="primary"
                            onClick={() => this.submitForm()}
                            disabled={disabled}
                    >{disabled? 'Signing Up..' : 'Sign Up' }</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

export default SignUp;