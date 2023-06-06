import React, {Fragment} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import { isAuthenticated } from "./services/auth";

import Main from './pages/main';
import Login from './pages/login';
import NewReminder from './pages/new-reminder';
import Reminder from './pages/reminder';
import SignUp from "./pages/signup";
import LoggedIn from "./components/LoggedIn";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
            <Fragment>
                <LoggedIn />
                <Component {...props} />
            </Fragment>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
  
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/main" component={Main} />
            <PrivateRoute path="/reminders/new-reminder" component={NewReminder} />
            <PrivateRoute path="/reminders/:id" component={Reminder} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;