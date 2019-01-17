import React from 'react'
import {Switch} from 'react-router-dom'

import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import ViewPost from './components/view_post/index'
import PrivateRoutes from './components/authRoutes/privateRoutes'
import PublicRoutes from './components/authRoutes/publicRoutes'
import NotFound404 from './components/ui/404'
import Authe from './high-order-comp/user_data'
import Layout from './high-order-comp/Layout'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <PublicRoutes restricted={false} path='/' exact component={Authe(Home)}></PublicRoutes>
        <PublicRoutes restricted={true} path='/sign_in' exact component={Authe(SignIn)}></PublicRoutes>
        <PrivateRoutes path='/view_post/' exact component={Authe(ViewPost)}></PrivateRoutes>
        <PublicRoutes restricted={false} component={NotFound404}></PublicRoutes>
      </Switch>
    </Layout>
  )
};

export default Routes