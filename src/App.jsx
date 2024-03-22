import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import { RouteBase } from 'constants/routeUrl';
import LoginPage from 'views/Login';
import ProjectSelect from 'views/ProjectSelect';
import DefaultLayout from 'layout/DefaultLayout';
import './scss/styles.scss';
import PrivateServiceRoute from 'components/PrivateServiceRoute';
import LayoutReceptionist from 'components/LayoutReceptionist';
import withPermission from 'HOCs/withPermission';
import { roles } from 'constants/index';

const ProjectSelectWithPermission = withPermission(ProjectSelect, [roles.ALL]);
const DefaultLayoutWithPermission = withPermission(DefaultLayout, [roles.ALL]);
const LayoutReceptionistWithPermission = withPermission(LayoutReceptionist, [roles.RECEPTION]);

const App = () => {
  useEffect(() => {
    window.addEventListener('offline', (event) => {
      alert('Bạn đang offline');
    });
    return () => {
      window.removeEventListener('offline', (event) => {
        alert('Bạn đang offline');
      });
    };
  }, []);
  //! Render
  return (
    <Router>
      <Routes>
        <Route path={RouteBase.Login} exact element={<LoginPage />} />
        <Route
          path={RouteBase.ProjectSelect}
          exact
          element={
            <PrivateRoute>
              <ProjectSelectWithPermission />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <PrivateServiceRoute>
                <DefaultLayoutWithPermission />
              </PrivateServiceRoute>
            </PrivateRoute>
          }
        />

        <Route
          path={RouteBase.Receptionist}
          element={
            <PrivateRoute>
              <PrivateServiceRoute>
                <LayoutReceptionistWithPermission />
              </PrivateServiceRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
