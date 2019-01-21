import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/home/index'
import SignIn from './components/sign_in/index'
import ViewPost from './components/view_post/index'
import NotFound404 from './components/ui/404'
import Authe from './high-order-comp/user_data'
import Layout from './high-order-comp/Layout'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Authe(Home, false)}></Route>
        <Route path='/sign_in' exact component={Authe(SignIn, true)}></Route>
        <Route path='/view_post/' exact component={Authe(ViewPost, true)}></Route>
        <Route exact component={NotFound404}></Route>
      </Switch>
    </Layout>
  )
};

export default Routes