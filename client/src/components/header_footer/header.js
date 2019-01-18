import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../css/header.css'

import {logoutUser} from '../../redux/actions/user_actions'

const Header = (props) => {
    const logoutHandler = () => {     
        props.dispatch(logoutUser())
        .then(response => {
            if (response.payload.success) {
                props.history.push('/')
                console.log('logout successful')
            }
        })
    }

    const privateButtons = () => (
        <React.Fragment>
            {props.user.userData.isAuth===true ?
                <LinkContainer to='/view_post'>
                    <NavItem>
                        View Posts
                    </NavItem>
                </LinkContainer>
                :
                null
            }
        </React.Fragment>
    )

    const signInButton = () => (
        <React.Fragment>
            {props.user.userData.isAuth===true ?
                <Nav pullRight>
                    <LinkContainer to='#'>
                        <NavItem onClick={()=> logoutHandler()}>
                            Log Out
                        </NavItem>
                    </LinkContainer>
                </Nav>
                :
                <Nav pullRight>
                    <LinkContainer to='/sign_in'>
                        <NavItem>
                            Sign In
                        </NavItem>
                    </LinkContainer>
                </Nav>
            }
        </React.Fragment>
    )

    return (
        <div>
            {console.log('header:', props)}
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <IndexLinkContainer to='/'>
                    <Navbar.Brand>
                    </Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle />
            </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to='/'>
                            <NavItem>
                                Home
                            </NavItem>
                        </IndexLinkContainer>
                        {props.user.userData!=null ? 
                            (privateButtons())
                            :
                            null
                        }
                    </Nav>
                {props.user.userData!=null ? 
                    (signInButton())
                    :
                    null
                }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStatetoProps)(withRouter(Header))