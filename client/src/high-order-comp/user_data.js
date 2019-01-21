import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

import { auth } from '../redux/actions/user_actions'


export default function Authe(WrappedComponent, redirect) {
    class AuthCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {
            this.props.dispatch(auth()).then(res => {
                let user = this.props.user.userData

                if (!user.isAuth && redirect===true) {
                    if (this.props.location.pathname !== '/sign_in' ) {
                        this.props.history.push('/sign_in')
                    }
                }

                if (user.isAuth && this.props.location.pathname === '/sign_in') {
                    this.props.history.push('/')
                }

                this.setState({
                    loading: false
                })
            })
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className='spinner_wrapper'>
                    <ReactLoading
                        className='spinner'
                        type={'spin'} 
                        color={'blue'} 
                        height={'10%'} 
                        width={'10%'} />
                    </div>
                )
            }

            return (
                <WrappedComponent {...this.props}/>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthCheck)
}