import React, { Fragment, Suspense, useEffect } from 'react';
import PrivateRoute from 'components/PrivateRoute';
import routes from 'routes/routes';
import { Route, Routes, useLocation } from 'react-router-dom';
import LayoutWithDrawerAndAppbar from 'components/LayoutWithDrawerAndAppbar';
import CommonIcons from 'components/CommonIcons';
import { RouteBase } from 'constants/routeUrl';
import Header from 'components/Header';
import CommonStyles from 'components/CommonStyles';
import { leftmenu, menuTelesale, menuFanpage, adminMenu, menuAds, menuTelesaleLead } from 'constants/leftmenu';
import HeaderProfile from 'components/HeaderProfile';
import HeaderLayoutContent from 'components/HeaderLayoutContent';
import { CircularProgress, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { roles } from 'constants/index';
import { useCall } from 'providers/CallProvider';
import CallingModal from 'views/Contacts/Components/CallingModal';

const useStyle = makeStyles((theme) => ({
  loading: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const DefaultLayout = (props) => {
  //! State
  const path = useLocation().pathname;
  const { open, toggle, shouldRender, onClickCancelCall, callStatus } = useCall();
  const classes = useStyle();
  const { userInfo } = useAuthentication();
  const role = userInfo?.userRoleDetail?.key || '';
  let menuSidebar = [];
  if (role === roles.TELESALE) {
    menuSidebar = menuTelesale;
  }
  if (role === roles.PAGE_LEAD) {
    menuSidebar = menuFanpage;
  }
  if (role === roles.FANPAGE) {
    menuSidebar = menuFanpage;
  }
  if (role === roles.MASTER_ADMIN) {
    menuSidebar = leftmenu;
  }
  if (role === roles.ADMIN) {
    menuSidebar = adminMenu;
  }
  if (role === roles.ADS) {
    menuSidebar = menuAds;
  }
  if (role === roles.TELESALE_LEAD) {
    menuSidebar = menuTelesaleLead;
  }

  const { pathname } = useLocation();

  let label = '';

  menuSidebar.forEach((item) => {
    Object.keys(item).forEach((key) => {
      item[key].map((elm) => {
        if (elm?.path === pathname) {
          label = elm?.label;
          return;
        }
      });
    });
  });

  //! Function

  //! Render
  return (
    <Fragment>
      {shouldRender && <CallingModal open={open} toggle={toggle} />}

      <LayoutWithDrawerAndAppbar
        header={<HeaderProfile />}
        headerContent={<HeaderLayoutContent header={label} title="" />}
        leftMenu={menuSidebar}
        menuTelesale={menuTelesale}
      >
        <Suspense
          fallback={
            <Box className={classes.loading}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {routes.map((route, idx, arr) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={
                    route.isPrivateRoute ? (
                      <PrivateRoute>
                        <route.component />
                      </PrivateRoute>
                    ) : (
                      <route.component />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </LayoutWithDrawerAndAppbar>
    </Fragment>
  );
};

export default DefaultLayout;
