import React from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import '../../css/header.css'

import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/user_actions'

const Header = (props) => {
    const logoutHandler = () => {
        this.props.dispatch(logoutUser())
        .then(response => {
            if (response.payload.success) {
                console.log('logout successful')
            }
        })
    }

    const privateButtons = () => (
        <React.Fragment>
            <LinkContainer to='/view_post'>
                <NavItem>
                    View Posts
                </NavItem>
            </LinkContainer>
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

                        {props.user!=null ? 
                            (privateButtons())
                            :
                        null
                        }
                    </Nav>
                {props.user!=null ? 
                    <Nav pullRight>
                        <LinkContainer to='/sign_in'>
                            <NavItem onClick={()=> logoutHandler()}>
                                Log Out
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                        :
                    <Nav pullRight>
                        <LinkContainer to='/sign_in'>
                            <NavItem onClick={()=> logoutHandler()}>
                                Sign In
                            </NavItem>
                        </LinkContainer>
                    </Nav>
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

export default connect(mapStatetoProps)(Header)