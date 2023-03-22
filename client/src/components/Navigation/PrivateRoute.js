import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Search from '../Search';
import history from './history';
import Landing from '../Landing'
import MyProfile from "../MyProfile";
import Profile from "../Profile"
import SignUp from "../SignUp";
import Inbox from '../Inbox';
import * as ROUTES from '../../constants/routes';
import SignIn from "../SignIn";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LANDING} exact component={Landing} />
        <Route path={ROUTES.MYPROFILE} exact component={MyProfile} />
        <Route path={ROUTES.PROFILE + "/:id"} exact component={Profile}/>
        <Route path={ROUTES.SEARCH} exact component={Search} />
        <Route path={ROUTES.SIGN_UP} exact component={SignUp} />
        <Route path={ROUTES.SIGN_IN} exact component={SignIn} />
        <Route path={ROUTES.INBOX} exact component={Inbox} />
      </Switch>
    </Router>
  );
}