import { roles } from 'constants/index';
import { useAuthentication } from 'providers/AuthenticationProvider';
import React, { Fragment } from 'react';

const ComponentWrapper = ({ children, permissionAllow = [] }) => {
  const { isLogged, userInfo } = useAuthentication();
  const role = userInfo?.userRoleDetail?.key || '';

  if (!isLogged) {
    return null;
  }

  if (permissionAllow.includes(roles.ALL) || permissionAllow.includes(role)) {
    return <Fragment>{children}</Fragment>;
  }

  return <div>You re not allow access to this</div>;
};

const withPermission = (Component, permissionAllow = []) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <ComponentWrapper permissionAllow={permissionAllow}>
          <Component {...this.props} />
        </ComponentWrapper>
      );
    }
  };
};

export default withPermission;
