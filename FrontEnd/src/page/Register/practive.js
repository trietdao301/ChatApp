// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  restricted,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && restricted ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const App = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <Router>
      <Switch>
        <PublicRoute
          restricted={false}
          isAuthenticated={isAuthenticated}
          component={LoginForm}
          path="/login"
          exact
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          component={Dashboard}
          path="/dashboard"
          exact
        />
      </Switch>
    </Router>
  );
};

export default App;
