import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import HeadLabel from './Head/HeadLabel';
import FormSearch from './FormSearch';
import useFilters from 'hooks/useFilters';
import CreateAndUpdateProject from './Components/CreateAndUpdateProject';
import { Box } from '@mui/material';
import { useGetListProject } from 'hooks/projects/useGetListProjects';
import moment from 'moment';
import { useDeleteProject } from 'hooks/projects/useDeleteProject';
import { showError, showInfo } from 'helpers/toast';
import { useUploadLogo } from 'hooks/projects/useUploadLogo';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    logo: {
      '& > img': {
        width: 60,
        height: 60,
        objectFit: 'cover',
      },
    },
  };
});

const Project = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const columns = [
    {
      label: <HeadLabel label="project_name" />,
      id: 'name',
    },
    {
      //   label: <HeadLabel label="project_logo" />,
      //   id: 'logo',
      label: <HeadLabel label="project_logo" />,
      id: 'logo',
      Cell: (row) => {
        return (
          <Box className={classes.logo}>
            <img src={`${BASE_IMAGE + row.logo}`} alt="" />
          </Box>
        );
      },
    },
    {
      label: <HeadLabel label="update_date" />,
      id: 'updatedAt',
    },
  ];
  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
  };

  const { filters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleSelectOne } =
    useFilters(initialFilters);

  const { isLoading: isDeletingProject, mutateAsync: deleteProject } = useDeleteProject();

  const { data: resProjectsList, isLoading, error, refetch } = useGetListProject(filters);
  const data = resProjectsList?.data?.data.data;
  const dataConvert = data?.map((item) => ({
    ...item,
    updatedAt: moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a'),
  }));
  const paging = resProjectsList?.data?.data.paging;

  //! Function

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      await refetch();
      showInfo(t('common:deleteProject_success'));
    } catch (error) {
      showError(t('common:deleteProject_error'));
    }
  };

  //! Render
  return (
    <Fragment>
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={dataConvert}
          total={paging?.total}
          maxPage={paging?.totalPage}
          columns={columns}
          hasCheckbox={true}
          noCheckboxHead={true}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleSelectOne={handleSelectOne}
        />
        <CreateAndUpdateProject
          rowsSelected={rowsSelected}
          handleDeleteProject={handleDeleteProject}
          handleSelectAll={handleSelectAll}
          refetch={refetch}
        />
      </CommonStyles.Content>
    </Fragment>
  );
};

export default Project;
