import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import InputField from 'components/CustomField/InputField';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useFilters from 'hooks/useFilters';
import CellActions from './Actions/CellActions';
import HeaderActions from './Actions/HeaderActions';
import { useGetLines } from 'hooks/lines/useGetLines';
import { useAddLine } from 'hooks/lines/useAddLine';
import { useEditline } from 'hooks/lines/useEditLine';
import { useDeleteLine } from 'hooks/lines/useDeleteLine';
import { showError, showInfo } from 'helpers/toast';
import { getTelesaleNames, toAcronym } from 'helpers/userlistHelpers';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '20px',
      justifyContent: 'space-between',
      gap: 12,
      '& .filter': {
        display: 'flex',
        flex: 1,
        gap: 12,
        '& .field-input': {
          flex: 1,
        },
        '& input': {
          paddingLeft: '0px !important',
        },
      },
    },
    user_code: {
      display: 'flex',
      justifyContent: 'center',
      '& .branchBox': {
        display: 'flex',
        // maxWidth: '350px',
        flexWrap: 'wrap',
        gap: '5px',
        marginTop: '10px',
      },
    },
    department: {
      padding: '0 8px',
      backgroundColor: '#EBF2FE',
      borderRadius: 4,
    },
  };
});

const LineList = () => {
  //! Render
  const classes = useStyles();
  const { t } = useTranslation();

  const columns = [
    {
      label: t('common:line_name'),
      id: 'name',
    },
    {
      label: t('common:line_password'),
      id: 'password',
    },
    {
      label: t('common:line_type'),
      id: 'type',
    },
    {
      label: 'ID tele',
      id: 'telesaleDetails',
      Cell: (row) => {
        return (
          <Box className={classes.user_code}>
            <Tooltip
              title={<span style={{ whiteSpace: 'pre-line' }}>{getTelesaleNames(row?.telesaleDetails)}</span>}
              followCursor
              arrow
            >
              <div className="branchBox">
                {row?.telesaleDetails?.map((item, index) => {
                  if (index >= 2) return;
                  return (
                    <Box key={item?.id} className={classes.department}>
                      {toAcronym(item?.fullname)}
                    </Box>
                  );
                })}
              </div>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      Cell: (row) => {
        return (
          <CellActions
            item={row}
            handleAddAndEditLine={handleAddAndEditLine}
            handleDeleteLine={handleDeleteLine}
            isLoading={isDeleteLine || isEditingLine}
          />
        );
      },
    },
  ];

  const initialFilters = {
    page: 1,
    pageSize: 10,
    sort: 'desc',
    searchValue: '',
  };
  const { filters, rowsSelected, handleChangePage, handleSelect, handleSelectAll, handleRequestSort, handleSearch } =
    useFilters(initialFilters);

  const { isLoading: isAddingLine, mutateAsync: addLine } = useAddLine();
  const { isLoading: isEditingLine, mutateAsync: editLine } = useEditline();
  const { isLoading: isDeleteLine, mutateAsync: deleteLine } = useDeleteLine();

  const { data: resLineList, isLoading, error, refetch } = useGetLines(filters);
  const data = resLineList?.data?.data.data;
  const paging = resLineList?.data?.data.paging;

  //! Function
  const handleAddAndEditLine = async (value, id) => {
    if (id) {
      try {
        await editLine({ data: value, id: id });
        showInfo(t('common:line_editSuccess'));
      } catch (error) {
        showError(error.message);
      }
    } else {
      try {
        await addLine(value);
        showInfo(t('common:line_addSuccess'));
      } catch (error) {
        showError(error.message);
      }
    }
    await refetch();
  };

  const handleDeleteLine = async (id) => {
    await deleteLine(id);
    await refetch();
    showInfo(t('common:line_deleteSuccess'));
  };

  //! Render
  return (
    <div>
      <div className={classes.header}>
        <HeaderActions handleAddAndEditLine={handleAddAndEditLine} isLoading={isAddingLine || isEditingLine} />
        <Formik
          initialValues={{
            searchText: '',
          }}
          onSubmit={(values) => {
            handleSearch('searchText')(values.searchText);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="filter">
                <div className="field-input">
                  <Field
                    name="searchText"
                    placeholder={t('common:search')}
                    component={InputField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CommonIcons.Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <CommonStyles.Button type="submit">{t('common:search')}</CommonStyles.Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <CommonStyles.Content>
        <CommonStyles.Table
          filters={filters}
          data={data}
          columns={columns}
          total={paging?.total}
          maxPage={paging?.totalPage}
          hasCheckbox={true}
          handleChangePage={handleChangePage}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
        />
      </CommonStyles.Content>
    </div>
  );
};

export default LineList;
