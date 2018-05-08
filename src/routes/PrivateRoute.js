import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, to, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { from: props.location },
            }}
          />
        )
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  to: PropTypes.string,
};

PrivateRoute.defaultProps = {
  to: '/',
};

export default PrivateRoute;
