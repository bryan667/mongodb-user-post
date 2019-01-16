import React from 'react'
import {Switch} from 'react-router-dom'
import ReactLoading from 'react-loading';

import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import ViewPost from './components/view_post/index'
import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'
import NotFound404 from './components/ui/404'
import Layout from './high-order-comp/Layout'
import retrieveUserData from './high-order-comp/user_data'

const Routes = (props) => {
  return (
    <React.Fragment>
      {props.user.userData ?
        <Layout>
          <Switch>
            <PublicRoutes restricted={false} path='/' exact component={Home}></PublicRoutes>
            <PublicRoutes restricted={true} path='/sign_in' exact component={SignIn}></PublicRoutes>
            <PrivateRoutes path='/view_post/' exact component={ViewPost}></PrivateRoutes>
            <PublicRoutes restricted={false} component={NotFound404}></PublicRoutes>
          </Switch>
        </Layout>
      : 
        <ReactLoading 
        className='spinner'
        type={'spin'} 
        color={'blue'} 
        height={'10%'} 
        width={'10%'} />
      }
    </React.Fragment>
  )
};

export default retrieveUserData(Routes);