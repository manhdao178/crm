import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Box } from '@mui/system';
import { Form, Formik, Field } from 'formik';
import { InputAdornment } from '@mui/material';
import SelectField from 'components/CustomField/SelectField';
import Sort from 'assets/IconsSVG/UserList/Sort.svg';
import useFilters from 'hooks/useFilters';
import InputField from 'components/CustomField/InputField';
import CellActions from './Actions/CellActions';
import { useGetListArchives } from 'hooks/archives/useGetListArchives';
import { useUnArchived } from 'hooks/archives/useUnArchived';
import { useEffect } from 'react';
import CellDate from './Cell/CellDate';
import { showError, showSuccess } from 'helpers/toast';
import CellLink from './Cell/CellLink';
import { useEditArchived } from 'hooks/archives/useEditArchived';
import CellItem from './Cell/CellItem';
import CellItemNote from './Cell/CellItemNote';
import httpServices from 'services/httpServices';
import CellWrongNumber from './Cell/CellWrongNumber';
import ActionFilterHeader from './Actions/ActionFilterHeader';
import { useContactPageLead } from 'providers/ContactPageLeadProvider';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => {
  return {
    userlist_header: {
      width: '100%',
      height: '56px',
      display: 'flex',
      gap: '12px',
      '& .search_container': {
        width: '58%',
        backgroundColor: theme.custom.colors.white,
        borderRadius: '12px',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
        '& .search_box': {
          width: '100%',
          '& input': {
            height: '32px',
          },
        },
      },
      '& .select_container': {
        borderRadius: '12px',
        backgroundColor: theme.custom.colors.white,
        border: 'solid 1px #C6CCD3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        '& div': {
          '&:nth-child(2)': {
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          },
        },
        '& .select_icon': {
          width: '24px',
          height: '24px',
          background: `url(${Sort}) no-repeat center center`,
          backgroundSize: 'cover',
          marginRight: '12px',
        },
        '& .select_box': {
          '& fieldset': {
            border: 0,
          },
          '& div': {
            color: '#434D56',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    sortBy: {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    labelTable: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

const Archives = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  const project = httpServices.getServiceStorage();
  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
    project: project,
  };

  const { filterTableArchives } = useContactPageLead();

  const { filters, setFilters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);

  const { data: resArchives, isLoading, error, refetch } = useGetListArchives(filters);
  const { isLoading: resettingUnArchived, mutateAsync: unArchived } = useUnArchived();
  const { isLoading: isEditingArchived, mutateAsync: editArchived } = useEditArchived();
  const data = resArchives?.data?.data.data || [];
  const paging = resArchives?.data?.data.paging || [];

  const columns = [
    {
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:first_assignDate')}
            <ActionFilterHeader label={t('common:first_assignDate')} title="firstAssignDate" />
          </Box>
        );
      },
      id: 'interactiveDate',
      Cell: (row) => <CellDate data={row?.firstTelesale?.assignDate} />,
    },
    {
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:last_assignDate')}
            <ActionFilterHeader label={t('common:last_assignDate')} title="assignDate" />
          </Box>
        );
      },
      id: 'interactiveDate',
      Cell: (row) => <CellDate data={row?.telesale?.assignDate} />,
    },
    {
      // label: t('common:archives_lastDate'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:archives_lastDate')}
            <ActionFilterHeader label={t('common:archives_lastDate')} title="interactiveDate" />
          </Box>
        );
      },
      id: 'interactiveDate',
      Cell: (row) => <CellDate data={row?.lastInteractiveDate} />,
    },
    {
      // label: t('common:data_name'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:data_name')}
            <ActionFilterHeader label={t('common:data_name')} title="fullname" />
          </Box>
        );
      },
      id: 'fullname',
      Cell: (row) => <CellItem data={row?.fullname} />,
    },
    {
      // label: t('common:data_numberPhone'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:data_numberPhone')}
            <ActionFilterHeader label={t('common:data_numberPhone')} title="phoneNumber" />
          </Box>
        );
      },
      id: 'phoneNumber',
      Cell: (row) => <CellItem data={row?.phoneNumber} />,
    },
    {
      label: t('common:data_link'),
      id: 'link',
      Cell: (row) => <CellLink data={row.link} />,
    },
    {
      // label: t('common:data_duplicate'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:data_duplicate')}
            <ActionFilterHeader label={t('common:data_duplicate')} title="isDuplicatePhoneNumber" />
          </Box>
        );
      },
      id: 'isDuplicatePhoneNumber',
      Cell: (row) => <CellWrongNumber disabled data={row.isDuplicatePhoneNumber} />,
    },
    {
      // label: t('common:data_service'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:data_service')}
            <ActionFilterHeader label={t('common:data_service')} title="service" />
          </Box>
        );
      },
      id: 'service',
      Cell: (row) => <CellItem data={row?.serviceDetail?.name} />,
    },
    {
      // label: t('common:data_branch'),
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:data_branch')}
            <ActionFilterHeader label={t('common:data_branch')} title="branch" />
          </Box>
        );
      },
      id: 'branch',
      Cell: (row) => <CellItem data={row?.branchDetail?.name} />,
    },
    {
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:first_telesale')}
            <ActionFilterHeader label={t('common:first_telesale')} title="firstTelesales" />
          </Box>
        );
      },
      id: 'telesale',
      Cell: (row) => <CellItem data={row?.firstTelesale?.assigneeDetail?.fullname} />,
    },
    {
      label_custom: () => {
        return (
          <Box className={classes.labelTable}>
            {t('common:last_telesale')}
            <ActionFilterHeader label={t('common:last_telesale')} title="telesales" />
          </Box>
        );
      },
      id: 'telesale',
      Cell: (row) => <CellItem data={row?.telesale?.assigneeDetail?.fullname} />,
    },
    {
      label: t('common:data_note'),
      id: 'note',
      Cell: (row) => <CellItemNote data={row?.note} />,
    },
    {
      Cell: (row) => {
        return <CellActions item={row} handleEditArchives={handleEditArchives} handleUnArchived={handleUnArchived} />;
      },
    },
  ];

  //! Function

  const handleUnArchived = async (id) => {
    try {
      await unArchived(id);
      showSuccess(t('common:archives_unarchivedSuccess'));
      refetch();
    } catch (error) {
      showError(error?.response.data.messages[0] || t('common:archives_unarchivedFailer'));
    }
    await refetch();
  };

  const handleEditArchives = async (values, id) => {
    try {
      await editArchived({ data: values, id: id });
      showSuccess(t('common:archives_editSuccess'));
      refetch();
    } catch (error) {
      showError(error?.response.data.messages[0]);
    }
    await refetch();
  };

  useEffect(() => {
    const filterConvert = {
      startLastInteractiveDate: filterTableArchives.startInteractiveDate
        ? filterTableArchives.startInteractiveDate.toISOString()
        : '',
      endLastInteractiveDate: filterTableArchives.endInteractiveDate
        ? filterTableArchives.endInteractiveDate.toISOString()
        : '',
      startFirstAssignDate: filterTableArchives.startFirstAssignDate
        ? filterTableArchives.startFirstAssignDate.toISOString()
        : '',
      endFirstAssignDate: filterTableArchives.endFirstAssignDate
        ? filterTableArchives.endFirstAssignDate.toISOString()
        : '',
      startAssignDate: filterTableArchives.startAssignDate ? filterTableArchives.startAssignDate.toISOString() : '',
      endAssignDate: filterTableArchives.endAssignDate ? filterTableArchives.endAssignDate.toISOString() : '',

      branches: filterTableArchives.branch ? filterTableArchives.branch.map((item) => item.value) : '',
      services: filterTableArchives.service ? filterTableArchives.service.map((item) => item.value) : '',
      fullname: filterTableArchives.fullname,
      phoneNumber: filterTableArchives.phoneNumber,
      isDuplicatePhoneNumber: filterTableArchives.isDuplicatePhoneNumber ? true : null,
      telesales: isEmpty(filterTableArchives.telesales) ? '' : filterTableArchives.telesales.map((item) => item.value),
      firstTelesales: isEmpty(filterTableArchives.firstTelesales)
        ? ''
        : filterTableArchives.firstTelesales.map((item) => item.value),
    };

    setFilters((prev) => ({ ...prev, search: filterConvert }));
  }, [filterTableArchives]);

  //! Render
  return (
    <Formik
      initialValues={{
        searchValue: '',
        sort: 'fullname:ASC',
      }}
      onSubmit={(values) => {
        handleSearch('searchText')(values.searchValue);
      }}
    >
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <Box mb="23px" className={classes.userlist_header}>
              <Box className="select_container">
                <Box>
                  <Box className="select_icon"></Box>
                </Box>
                <Box className={classes.sortBy}>{t('common:sort_by')}</Box>
                <Box>
                  <Field
                    component={SelectField}
                    options={[{ value: 'fullname:ASC', label: `${t('common:permission_name')}` }]}
                    className="select_box"
                    name="sort"
                    value={props.values.sort}
                    afterOnChange={(e) => handleRequestSort('sort')(e.target.value)}
                  />
                </Box>
              </Box>
              <Box className="search_container">
                <Field
                  component={InputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommonIcons.Search />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={t('common:userlist_search')}
                  sx={{ height: '100%' }}
                  className="search_box"
                  name="searchValue"
                />
              </Box>
              <CommonStyles.Button sx={{ flex: 1, overflow: 'hidden' }} color="primary" type="submit">
                {t('common:search')}
              </CommonStyles.Button>
            </Box>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={data}
                isLoading={isLoading}
                total={paging?.total}
                maxPage={paging?.totalPage}
                columns={columns}
                hasCheckbox={false}
                handleChangePage={handleChangePage}
                currentPage={filters.page}
                // handleSelect={handleSelect}
                // handleSelectAll={handleSelectAll}
                sxCell={{ padding: '15px 10px !important' }}
              />
            </CommonStyles.Content>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Archives;
