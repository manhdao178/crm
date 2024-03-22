import React, { useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box } from '@mui/system';

import Background from 'assets/images/background.svg';
import MedicSkin from 'assets/images/Project/MedicSkin.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { useGetListProjects } from 'hooks/project/useGetListProject';
import { BASE_IMAGE } from 'constants/api';
import SimpleBarReact from 'simplebar-react';
import { useGetListAuthProject } from 'hooks/project/useGetListAuthProject';
import { RouteBase } from 'constants/routeUrl';
import navigateHandler from '../../helpers/navigateHandler';
import httpServices from 'services/httpServices';
import HeaderLayoutContent from 'components/HeaderLayoutContent';
import { isEmpty } from 'lodash';
import { Alert } from '@mui/material';
import { roles } from 'constants';
import logoNLS from 'assets/logos/logoNLS.jpg';

const useStyles = makeStyles((theme) => {
  return {
    box: {
      width: '100vw',
      overflowX: 'auto',
    },
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fbff',
      backgroundImage: `url(${Background})`,
      // backgroundPosition: 'center',
      // backgroundSize: 'cover',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundAttachment: 'fixed',
      flexDirection: 'column',
      '& .title_group': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '60px',
        '& .title': {
          color: '#112957',
          textTransform: 'uppercase',
        },
        '& .sub_title': {
          color: '#434D56',
        },
      },
      '& .project_group': {
        display: 'flex',
        gap: '64px',
        padding: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        '& .project_item': {
          height: '300px',
          width: '250px',
          backgroundPosition: '50% 30%',
          backgroundSize: '65%',
          borderRadius: '16px',
          border: 'solid 2px #99FF66',
          backgroundColor: theme.custom.colors.white,
          backgroundRepeat: 'no-repeat',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          },
        },
      },
      '& .simplebar-scrollbar': {
        position: 'static',
        height: '20px !important',
        '&:before': {
          background: '#fff !important',
        },
      },
    },
    title: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '800',
      fontSize: '30px',
      padding: '0 10px',
      color: '#115690',
      marginBottom: '20px',
      textTransform: 'uppercase',
    },
    boxNoProject: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
    noProjectTitle: {
      fontSize: '18px',
      fontWeight: 600,
    },
    headerProfile: {
      position: 'fixed',
      top: 40,
      right: 30,
    },
  };
});

const ProjectSelect = (props) => {
  //! State
  const { chooseService, userInfo } = useAuthentication();
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { data: listProject, isLoading: isLoadingGetProject } = useGetListProjects();
  // const projectOptions = listProject?.data?.data?.data || [];

  const { data: listAuthProject, isLoading: isLoadingGetAuthProject } = useGetListAuthProject();
  const projectsAuth = listAuthProject?.data?.data || [];
  const role = userInfo?.userRoleDetail?.key || '';
  //! Function
  const handleSelectProject = (id) => {
    // localStorage.setItem('service', id);
    httpServices.saveServiceStorage(id);
    chooseService(id);

    navigateHandler(navigate, role);
  };

  useLayoutEffect(() => {
    const serviceSelected = httpServices.getServiceStorage();
    if (serviceSelected) {
      navigateHandler(navigate, role);
    }
    if (role === roles.ADMIN || role === roles.MASTER_ADMIN) {
      navigate(RouteBase.UserList, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (projectsAuth && projectsAuth.length === 1) {
      const id = projectsAuth[0].id;
      handleSelectProject(id);
    }
  }, [projectsAuth]);

  //! Render
  return (
    <Box className={classes.container}>
      <Box className="title_group">
        <CommonStyles.Typography variant="h1" component="h1" className="title">
          {t('common:projectSelect_title')}
        </CommonStyles.Typography>
        <CommonStyles.Typography variant="h4" component="h4" className="sub_title">
          {t('common:projectSelect_subTitle')}
        </CommonStyles.Typography>
      </Box>
      {/* <SimpleBarReact style={{ maxWidth: '100vw', width: '100vw' }}> */}
      <Box className="project_group">
        {projectsAuth.map((item, index) => {
          return (
            <Box
              key={item?._id || index}
              className="project_item"
              style={{ backgroundImage: `url(${BASE_IMAGE + item?.logo})` }}
              onClick={() => handleSelectProject(item?._id)}
            >
              <Box className={classes.title}>{item?.name}</Box>
            </Box>
          );
        })}
      </Box>
      <Box className={classes.headerProfile}>
        <HeaderLayoutContent header="" title="" />
      </Box>
      {isEmpty(projectsAuth) && (
        <Alert severity="warning">
          <span className={classes.noProjectTitle}>{t('common:no_project_tile')}</span>
        </Alert>
      )}
      {/* </SimpleBarReact> */}
    </Box>
  );
};

export default ProjectSelect;
