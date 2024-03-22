import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import Page404 from 'views/Page404';

const PrivateRoute = (props) => {
  //! State
  const { isLogged } = useAuthentication();
  const path = useLocation().pathname;
  const routes = Object.values(RouteBase);
  const isRoute = routes.findIndex((item) => item === path);

  //! Render
  if (isLogged) {
    if (isRoute === -1) {
      return <Page404 />;
    }
    return props.children;
  }

  return <Navigate to={RouteBase.Login} replace />;
};

export default PrivateRoute;
