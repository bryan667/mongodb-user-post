import React from 'react';
import ReactLoading from 'react-loading';
import NoUser from './no_user'
import { connect } from 'react-redux'
import '../../css/home.css'

import UserImage from '../ui/user_image'

const Home = (props)=> {
    return (
        <div className='home_main' >
                {props.user.userData ?
                <React.Fragment>
                    {props.user.userData.isAuth===true ? 
                        <div>
                            <div className='home_container'>
                                    {props.user.userData.email !=='' ?
                                        <React.Fragment>
                                            <div className='background'>
                                            </div>
                                            <div className='image_div'>
                                                <div className='image_wrapper'>
                                                    <UserImage 
                                                        imageID={props.user.userData.imageID}
                                                    />
                                                </div>
                                            </div>
                                            <div className='info'>
                                                <h1>{`Welcome ${props.user.userData.firstname} ${props.user.userData.lastname}!`}</h1>           
                                                <div>{`logged in as ${props.user.userData.email}`}</div>
                                            </div>

                                            <div className='intro'>
                                                <div>
                                                    <h1>Intro</h1>
                                                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                                </div>
                                            </div>

                                            <div className='description'>
                                                <div>
                                                    <h1>About Me</h1>
                                                    <p>""Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?""</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        : 
                                        <div className='spinner_wrapper'>
                                            <ReactLoading 
                                            className='spinner'
                                            type={'spin'} 
                                            color={'blue'} 
                                            height={'10%'} 
                                            width={'10%'} />
                                        </div>
                                    }
                            </div>
                        </div>
                        :
                        <NoUser />
                    }
                </React.Fragment>
                :null
                }
        </div>
    );
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStatetoProps)(Home);