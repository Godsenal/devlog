import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => renderMergedProps(component, routeProps, rest)}
  />
);

PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const PrivateRoute = ({
  component,
  redirectTo,
  isAuthenticated,
  ...rest
}) => (<Route
  {...rest}
  render={
    routeProps =>
      (isAuthenticated ?
        renderMergedProps(component, routeProps, rest)
        :
        (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: routeProps.location },
            }}
          />
        )
      )
  }
/>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export {
  PropsRoute,
  PrivateRoute
};
