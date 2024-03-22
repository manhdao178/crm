import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';

const PrivateUserRoleRoute = (props) => {
  //! State
  const { userInfo } = useAuthentication();

  //! Render
  if (1 === 2) {
    return props.children;
  }

  return <Navigate to={RouteBase.ProjectSelect} replace />;
};

export default PrivateUserRoleRoute;
