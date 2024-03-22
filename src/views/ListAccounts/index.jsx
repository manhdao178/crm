import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import useFilters from 'hooks/useFilters';
import useToggleDialog from 'hooks/useToggleDialog';
import { showError, showSuccess } from 'helpers/toast';
import CellActions from './Cell/CellActions';
import HeaderActions from './Cell/HeaderActions';
import CellLink from './Cell/CellLink';
import { Tooltip } from '@mui/material';
import { useGetAdsImportData } from 'hooks/adsImportData/useGetAdsImportData';
import { useEditAdsImportData } from 'hooks/adsImportData/useEditAdsImportData';
import { useAddImportData } from 'hooks/adsImportData/useAddAdsImportData';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      marginBottom: '20px',
    },
    accountlist_header: {
      width: '100%',
      height: '56px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      '& .search_container': {
        width: '75%',
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
    },
    today: {
      maxWidth: '200px',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
    },
  };
});

const initialFilters = {
  page: 1,
  pageSize: 10,
  sort: 'desc',
};

const ListAccounts = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openAddAccount, toggle: toggleAddAccount, shouldRender: shouldRenderAddAccount } = useToggleDialog();
  const { filters, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);
  const columns = [
    {
      label: `${t('common:account_ads_today')}`,
      id: 'adsToday',
      Cell: (row) => {
        return <CellLink data={row.adsToday} />;
      },
    },
    {
      label: `${t('common:account_ads_month')}`,
      id: 'adsMonth',
      Cell: (row) => {
        return <CellLink data={row.adsMonth} />;
      },
    },
    {
      label: `${t('common:account_turnover')}`,
      id: 'income',
      Cell: (row) => {
        return <CellLink data={row.income} />;
      },
    },
    {
      Cell: (row) => {
        return <CellActions item={row} handleAddAndEditAccount={handleAddAndEditAccount} />;
      },
    },
  ];
  const { data: dataAds, isLoading, refetch } = useGetAdsImportData();
  const data = dataAds?.data?.data?.data;

  const { isLoading: isAddingDataAds, mutateAsync: addDataAds } = useAddImportData();
  const { isLoading: isEditingDataAds, mutateAsync: editDataAds } = useEditAdsImportData();

  //! Function

  const handleAddAndEditAccount = async (value, id) => {
    if (id) {
      try {
        await editDataAds({ data: value, id: id });
        showSuccess(t('common:account_editSuccess'));
      } catch (error) {
        showError(error.message);
      }
    } else {
      try {
        await addDataAds(value);
        showSuccess(t('common:account_addSuccess'));
      } catch (error) {
        showError(error.message);
      }
    }
    await refetch();
  };

  //! Render
  return (
    <Formik
      initialValues={{
        searchValue: '',
      }}
      onSubmit={(values) => {
        handleSearch('searchText')(values.searchValue);
      }}
    >
      {(props) => {
        return (
          <Form style={{ marginBottom: '50px' }}>
            <div className={classes.header}>
              <HeaderActions
                handleAddAndEditAccount={handleAddAndEditAccount}
                isLoading={isAddingDataAds || isEditingDataAds}
              />
            </div>
            <CommonStyles.Content>
              <CommonStyles.Table
                filters={filters}
                data={data}
                columns={columns}
                // hasCheckbox={true}
                // handleChangePage={handleChangePage}
                // handleSelect={handleSelect}
                // handleSelectAll={handleSelectAll}
              />
            </CommonStyles.Content>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ListAccounts;
