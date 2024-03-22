import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { roles } from 'constants/index';

const PrivateServiceRoute = (props) => {
  //! State
  const { serviceSelected, userInfo } = useAuthentication();
  const role = userInfo?.userRoleDetail?.key || '';
  //! Render
  if (!!serviceSelected || role === roles.ADMIN || role === roles.MASTER_ADMIN) {
    return props.children;
  }

  return <Navigate to={RouteBase.ProjectSelect} replace />;
};

export default PrivateServiceRoute;
