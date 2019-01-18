import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../redux/actions/user_actions'

export default function Authe(WrappedComponent) {
    class AuthCheck extends Component {
        componentDidMount() {
            if (this.props.user!=null) { 
                this.props.dispatch(auth())
            }
        }

        render() {
            return (
                <WrappedComponent userData={this.state} {...this.props}/>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthCheck)
}